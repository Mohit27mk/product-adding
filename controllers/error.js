//If there is request not matching any route than it hit this controller 
//It send 404 status 
exports.get404 = (req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found', path: '/404' });
  };
  