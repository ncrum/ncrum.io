import mongoose from 'mongoose';
import path from 'path';

export default function(router, model, base) {
  const name = model.modelName;
  const collectionPath = path.join(base, name);
  const entityPath = path.join(collectionPath, ':id');

  function persist(obj) {
    return function* () {
      yield obj.save;
    };
  };

  function errorMsg(err, msg) {
    return msg + '\n' + err;
  }

  router.get(collectionPath, function* () {
    let fl = this.query.fl;
    let conditions = this.query.conditions || '{}';
    let all = yield model.find(JSON.parse(conditions)).select(fl).exec();
    this.body = all;
  });

  router.post(collectionPath, function* () {
    let body = this.request.body;

    try {
      let object = new model(body);
      yield persist(object)();
      this.status = 200;
    } catch(err) {
      this.throw(errorMsg(err, 'unable to add new ' + name), 500);
    }
  });

  router.delete(collectionPath, function* () {
    try {
      yield model.find({}).remove().exec();
      this.status = 200;
    } catch(err) {
      this.throw(errorMsg(err, 'unable to delete all ' + name), 500);
    }
  })

  router.get(entityPath, function* () {
    let id = this.params.id;

    try {
      let object = yield model.findById(id).exec();

      if (object) {
        this.body = object;
        this.status = 200;
      } else {
        throw 'no object found';
      }
    } catch(err) {
      this.throw(errorMsg(err, 'unable to find ' + name + ' with id ' + id), 500);
    }
  });

  router.put(entityPath, function* () {
    let body = this.request.body;
    let id = this.params.id;

    try {
      let object = yield model.findById(id).exec();
      object = Object.assign(object, body);
      yield persist(object)();
      this.status = 200;
    } catch(err) {
      this.throw(errorMsg(err, 'unable to update ' + name + ' with id ' + id), 500);
    }
  });

  router.delete(entityPath, function* () {
    let id = this.params.id;

    try {
      yield model.findById(id).remove().exec();
      this.status = 200;
    } catch(err) {
      this.throw(errorMsg(err, 'unable to delete ' + name + ' with id ' + id), 500);
    }
  });
}
