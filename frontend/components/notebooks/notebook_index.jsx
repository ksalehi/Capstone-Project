const React = require('react');
// const SessionActions = require('../actions/session_actions.js');
// const hashHistory = require('react-router').hashHistory;
const NotebookStore = require('../../stores/notebook_store');
const NotebookActions = require('../../actions/notebook_actions');

const NotebookIndex = React.createClass({
  getInitialState() {
    return { notebooks: NotebookStore.all() };
  },
  componentDidMount() {
    NotebookActions.fetchNotebooks();
    this.notebookListener = NotebookStore.addListener(this._onChange);
  },
  componentWillUnmount() {
    this.notebookListener.remove();
  },
  _onChange() {
    this.setState({ notebooks: NotebookStore.all() });
  },
  render(){
    const notebooks = this.state.notebooks;
    console.log(notebooks);
    return (
      <div>
        <ul>
          {
            notebooks.map( notebook => {
              return (<li>{notebook.title}</li>);
            })
          }
        </ul>
      </div>
    );
  }
});

module.exports = NotebookIndex;
