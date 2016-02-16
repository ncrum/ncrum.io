import React from 'react';
import {Link} from 'react-router';

class App extends React.Component {
  render() {
    return (
      <div>
        {/*
          Portrait ----- About Blog (default) Projects
        */}
        <section className="top-nav-container">
          <div className="portrait">
            <img src="https://scontent-dfw1-1.xx.fbcdn.net/hprofile-xlp1/v/t1.0-1/c0.0.320.320/p320x320/12295516_1069095493112465_6347863439498146048_n.jpg?oh=3be70e60cf372c178ed0db01cb770b18&oe=576F7353"/>
          </div>
          <nav className="top-nav">
            <ul className="list">
              <li className="item">
                <Link to="/about" activeClassName="active">About</Link>
              </li>
              <li className="item" >
                <Link to="/blog" activeClassName="active">Blog</Link>
              </li>
              <li className="item" activeClassName="active">
                <Link to="/projects">Projects</Link>
              </li>
            </ul>
          </nav>
        </section>

        {this.props.children}
      </div>
    );
  }
}

export default App;
