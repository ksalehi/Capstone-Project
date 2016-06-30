const NotebookApiUtil = {
  fetchNotebooks(successCB, errorCB) {
    $.ajax({
      method: 'GET',
      url: 'api/notebooks',
      success(data) {
        console.log('success');
        console.log(data);
        successCB(data);
      },
      error(data) {
        console.log('error');
        console.log(data);
        errorCB(data);
      }
    });
  },
  getNotebook(id, successCB, errorCB) {
    $.ajax({
      method: 'GET',
      url: `api/notebooks/${id}`,
      success: successCB,
      error: errorCB
    });
  },
  createNotebook(notebookData, successCB, errorCB){
    $.ajax({
      method: 'POST',
      url: 'api/notebooks',
      data: { notebook: notebookData },
      success: successCB,
      error: errorCB
    });
  },
  updateNotebook(notebookData, successCB, errorCB){
    $.ajax({
      method: 'PATCH',
      url: `api/notebooks/${notebookData.id}`,
      data: { notebook: {
        title: notebookData.title,
        body: notebookData.body
      }},
      success: successCB,
      error: errorCB
    });
  },
  deleteNotebook(id, successCB, errorCB){
    $.ajax({
      method: 'DELETE',
      url: `api/notebooks/${id}`,
      success: successCB,
      error: errorCB
    });
  }
};

module.exports = NotebookApiUtil;