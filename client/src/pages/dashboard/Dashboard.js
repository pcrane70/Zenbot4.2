import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Button, ButtonGroup, ButtonToolbar, DropdownButton, MenuItem, ProgressBar,
  Alert, Row, Col, ListGroup, Badge, Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Widget from '../../components/Widget';
import { fetchPosts } from '../../actions/posts';


import s from './Dashboard.scss';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      alert1Visible: true,
      alert2Visible: true,
      alert3Visible: true,
      alert4Visible: true,
    };

    this.convertTimeStampToDateTime = this.convertTimeStampToDateTime.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(fetchPosts());
  }

  convertTimeStampToDateTime(timeInSeconds) {
    const dateTime = new Date(timeInSeconds);
    return dateTime.toISOString();
  }

  render() {
    return (
      <div className={s.root}>
        <ol className="breadcrumb">
          <li><span className="text-muted">YOU ARE HERE</span></li>
          <li className="active">Dashboard</li>
        </ol>
        <h1 className="mb-lg">Dashboard</h1>
        <Row>
          <Col sm={6}>
            <Widget title={
              <div>
                <div className="pull-right mt-n-xs">
                  <input type="search" placeholder="Search..." className="form-control input-sm" />
                </div>
                <h5 className="mt-0"><Glyphicon glyph="user" className="mr-xs opacity-70"/> Posts</h5>
              </div>
              }>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Selector</th>
                    <th>Side</th>
                    <th>Date</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.posts && this.props.posts.map((post, index) => (
                    <tr key={post.trade_id}>
                      <td>{post.selector}</td>
                      <td>{post.side}</td>
                      <td>{this.convertTimeStampToDateTime(post.time)}</td>
                      <td>{post.price}</td>
                    </tr>
                  ))}
                {this.props.posts && !this.props.posts.length &&
                  <tr>
                    <td colSpan="100">No posts yet</td>
                  </tr>
                }
                {this.props.isFetching &&
                  <tr>
                    <td colSpan="100">Loading...</td>
                  </tr>
                }
                </tbody>
              </table>
            </Widget>
          </Col>
          <Col sm={6}>
            <Widget title={
              <div>
                <div className="pull-right mt-n-xs">
                  <a className="td-underline fs-sm">Options</a>
                </div>
                <h5 className="mt-0 mb-0">Recent posts <Badge bsStyle="success" className="ml-xs">5</Badge></h5>
                <p className="fs-sm mb-0 text-muted">posts, that have been published recently</p>
              </div>
            }>
              <table className="table table-sm table-no-border mb-0">
                <tbody>
                {this.props.posts && this.props.posts.map((post, index) => (
                  <tr key={post.id}>
                    <td>{new Date(post.updatedAt).toLocaleString() }</td>
                    <td><Link to="/app/posts">{post.title}</Link></td>
                  </tr>
                ))}
                {this.props.posts && !this.props.posts.length &&
                <tr>
                  <td colSpan="100">No posts yet</td>
                </tr>
                }
                {this.props.isFetching &&
                <tr>
                  <td colSpan="100">Loading...</td>
                </tr>
                }
                </tbody>
              </table>
            </Widget>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <ListGroup>
              <Link to="/app" className="list-group-item"><Glyphicon glyph="phone" className="mr-xs opacity-70"/> Incoming calls <Badge bsStyle="danger">3</Badge></Link>
              <Link to="/app" className="list-group-item"><Glyphicon glyph="bell" className="mr-xs opacity-70"/> Notifications <Badge bsStyle="warning">6</Badge></Link>
              <Link to="/app" className="list-group-item"><Glyphicon glyph="comment" className="mr-xs opacity-70"/> Messages <Badge bsStyle="success">18</Badge></Link>
              <Link to="/app" className="list-group-item"><Glyphicon glyph="eye-open" className="mr-xs opacity-70"/> Visits total</Link>
              <Link to="/app" className="list-group-item"><Glyphicon glyph="cloud" className="mr-xs opacity-70"/> Inbox <Glyphicon glyph="chevron-right" className="opacity-70 pull-right"/></Link>
            </ListGroup>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.posts.isFetching,
    posts: state.posts.posts
  };
}

export default connect(mapStateToProps)(withStyles(s)(Dashboard));
