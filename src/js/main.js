var model = {
  number: 0,
  calculate: function(x, y) {
    this.number = x * y;
    var result = this.number;

    view.showResult(result);
  },
  createMessage: function () {
    this.currentMessage = 'Wrong string!';
    var message = this.currentMessage;

    view.showResult(message);
  }
};

var view = {
  showResult: function(n) {
    var el = document.getElementById('showResult');
    el.innerHTML = n;
  }
};

var controller = {
  handleClick: function () {
    var input = document.getElementById('calcData'),
        x = +input.value[0], y = +input.value[2];

    if(!x || !y)
    return model.createMessage();

    model.calculate(x, y);
  }
};

// Immediately-invoked function expression (initializing)

(function() {
  var app = {
    init: function () {
      this.main();
      this.event();
    },
    main: function () {

    },
    event: function () {
      var el = document.getElementById('calcUser');
      el.onclick = controller.handleClick;
    }
  };
  app.init();
}());
