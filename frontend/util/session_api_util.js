const SessionApiUtil = {
  signUp(userData, successCB, errorCB) {
    $.ajax({
      method: 'POST',
      url: 'api/users',
      data: { userData },
      dataType: 'JSON',
      success: successCB,
      error(response){
        errorCB("login", response.responseJSON);
      }
    });
  },
  logIn(userData, successCB, errorCB, optionalCB) {
    $.ajax({
      method: 'POST',
      url: 'api/session',
      data: { userData },
      dataType: 'JSON',
      success(data) {
        successCB(data);
        if (optionalCB) {
          optionalCB(data);
        }
      },
      error(response){
        errorCB("login", response.responseJSON.base);
      }
    });
  },
  logOut(successCB, errorCB) {
    $.ajax({
      method: 'DELETE',
      url: 'api/session',
      dataType: 'JSON',
      success: successCB,
      error(response){
        errorCB("logout", response.responseJSON.base);
      }
    });
  }
};

module.exports = SessionApiUtil;
