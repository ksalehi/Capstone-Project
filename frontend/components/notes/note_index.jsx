const React = require('react');
const hashHistory = require('react-router').hashHistory;
const NoteStore = require('../../stores/note_store');
const NoteActions = require('../../actions/note_actions');
const NoteIndexItem = require('./note_index_item');

const NoteIndex = React.createClass({
  getInitialState() {
    return { notes: NoteStore.all() };
  },
  componentDidMount() {
    NoteActions.fetchNotes();
    this.noteListener = NoteStore.addListener(this._onChange);
  },
  componentWillUnmount() {
    this.noteListener.remove();
  },
  _onChange() {
    // debugger; // this is triggered when I delete a note, yet the NoteStore shows both notes still there
    this.setState({ notes: NoteStore.all() });
  },
  newNote(e){
    e.preventDefault();
    const url = '/notes/new';
    hashHistory.push(url);
  },
  render(){
    const notes = this.state.notes;
    const that = this;
    const path = this.props.location.pathname;

    return (
      <div>
        <button className="new-note-button" onClick={this.newNote}>+</button>
        <ul className="notes-list">
          <h2 className="notes-list-header">Notes</h2>
          {
            notes.map( note => {
              return (<NoteIndexItem
                key={note.id}
                note={note}
                selected={ path === `/notes/${note.id}` ? true : false }
                />);
              })
            }
        </ul>
        {this.props.children}
      </div>
    );
  }
});

module.exports = NoteIndex;
