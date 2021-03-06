const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const NoteConstants = require('../constants/note_constants');
const NoteStore = new Store(AppDispatcher);
const hashHistory = require('react-router').hashHistory;

let _notes = {};
let _latestNote;

const dateSorter = function(note1, note2) {
  return (new Date(note2.updated_at) - new Date(note1.updated_at));
};

NoteStore.all = function(notebookId) {
  let unsortedNotes = Object.keys(_notes).map( noteKey => {
    return _notes[noteKey];
  });
  if (notebookId) {
    unsortedNotes = unsortedNotes.filter(note => note.notebook_id === parseInt(notebookId));
  }
  let sortedNotes = unsortedNotes.sort(dateSorter);
  _latestNote = sortedNotes[0];
  return sortedNotes;
};

NoteStore.noteIds = function() {
  return Object.keys(_notes).map( noteKey => {
    return parseInt(noteKey);
  });
};

NoteStore.getLatestNote = function(notebookId) {
  NoteStore.all(notebookId);
  return _latestNote;
};

NoteStore.find = function(id) {
  return _notes[id];
};

function resetNotes(notes) {
  _notes = {};
  for (let i = 0; i < notes.length; i++) {
    let note = notes[i];
    _notes[note.id] = note;
  }
  NoteStore.all();
}

function resetSingleNote(note) {
  _notes[note.id] = note;
}

function removeNote(note) {
  delete _notes[note.id];
}

NoteStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case NoteConstants.NOTES_RECEIVED:
      resetNotes(payload.notes);
      break;
    case NoteConstants.NOTE_RECEIVED:
      resetSingleNote(payload.note);
      break;
    case NoteConstants.NOTE_REMOVED:
      removeNote(payload.note);
      break;
    }
  NoteStore.__emitChange();
};

module.exports = NoteStore;
