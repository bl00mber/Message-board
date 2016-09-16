var  my_news = [
  {
    author:  'Yves G',
    text:  "I didn't try the food. I wasn't there to eat, but to relax.",
    bigText: 'Just passed the Consumer Review Fairness Act to prevent companies from using gag orders to stop customers from writing honest reviews online.'
  },
  {
    author:  'Jonathan Haynes',
    text:  'I worked at Lorem Ipsum full-time (More than a year)',
    bigText: "On Friday the company buys lunches for everyone. But they've also decreased how much they will cover over time. It went from $20, down to $15 before tip then down to $15 with tip."
  },
  {
    author:  'Steve Campion',
    text:  '62% of job seekers feel better about companies that respond to reviews',
    bigText: 'Astonishing result from blind resume reviews by tech companies. Should this become a best practice in hiring?'
  }
];

window.ee = new EventEmitter();

var Article = React.createClass({
  propTypes: {
    data: React.PropTypes.shape({
      author: React.PropTypes.string.isRequired,
      text: React.PropTypes.string.isRequired,
      bigText: React.PropTypes.string.isRequired,
      index: React.PropTypes.number.isRequired
    })
  },

  getInitialState: function() {
    return {
      hidden: true
    }
  },

  readMoreClick: function(e) {
    e.preventDefault();
    this.setState({hidden: false});
  },

  articleDeleteClick: function(e) {
    this.setState({hidden: true});
    var index = this.props.data.index;
    window.ee.emit('News.delete', index);
  },

  render: function() {
    var author = this.props.data.author,
        text = this.props.data.text,
        bigText = this.props.data.bigText,
        hidden = this.state.hidden;

    return (
      <div className="article">
        <div
          className='delete__btn'
          onClick={this.articleDeleteClick}
        >[x]</div>

        <p className="news__author">{author}:</p>
        <p className="news__text">{text}</p>
        <a href="#"
          onClick={this.readMoreClick}
          className={'news__readmore' + (hidden ? '' : ' hidden')}>
          More..
        </a>
        <p className={'news__big-text' + (hidden ? ' hidden' : '')}>{bigText}</p>
      </div>
    )
  }
});

var News = React.createClass({
  propTypes: {
    data: React.PropTypes.array.isRequired
  },

  render: function() {
    var data = this.props.data,
        newsTemplate;

    if (data.length > 0) {
      newsTemplate = data.map(function(item, index) {
        item.index = index;

        return (
          <div key={index}>
              <Article data={item}/>
          </div>
        )
      })
    } else {
      newsTemplate = <p>No news</p>
    }

    return (
      <div className="news">
        {newsTemplate}
        <br/>
        <b className={"news__count" + (data.length > 0 ? '' : ' hidden')}>
          Total news count: {data.length}
        </b>
      </div>
    );
  },
});

var Add = React.createClass({
  getInitialState: function() {
    return {
      btnIsDisabled: true
    };
  },

  onBtnClickHandler: function(e) {
    e.preventDefault();
    var author = ReactDOM.findDOMNode(this.refs.new_author).value;
    var text = ReactDOM.findDOMNode(this.refs.new_text).value;
    var bigText = ReactDOM.findDOMNode(this.refs.new_bigText).value;

    var item = [{
      author: author,
      text: text,
      bigText: bigText
    }];

    window.ee.emit('News.add', item);
  },

  onValidate: function(e)  {
    var author = ReactDOM.findDOMNode(this.refs.new_author).value.trim();
    var text = ReactDOM.findDOMNode(this.refs.new_text).value.trim();
    var bigText = ReactDOM.findDOMNode(this.refs.new_bigText).value.trim();
    var agree = ReactDOM.findDOMNode(this.refs.checkrule).checked;

    if (author && text && bigText && agree) {
      this.setState({btnIsDisabled: false});
    } else {
      this.setState({btnIsDisabled: true});
    };
  },

  render: function() {
    return (
      <form>
        <input
          type='text'
          className='add__author'
          defaultValue=''
          placeholder='Author'
          ref='new_author'
          onChange={this.onValidate}
        />
        <textarea
          type='textarea'
          className='add__text'
          defaultValue=''
          placeholder='Preview'
          ref='new_text'
          onChange={this.onValidate}
        ></textarea>
        <textarea
          type='textarea'
          className='add__text'
          defaultValue=''
          placeholder='Text'
          ref='new_bigText'
          onChange={this.onValidate}
        ></textarea>
        <label className='add__checkrule'>
          <input type='checkbox' ref='checkrule'
           onChange={this.onValidate}/> I agree with rules
        </label>
        <button
          className='add__btn'
          onClick={this.onBtnClickHandler}
          ref='add_btn'
          disabled={this.state.btnIsDisabled}
        >Add</button>
      </form>
    );
  }
});

var App = React.createClass({
  getInitialState: function() {
    return {
      news: my_news
    };
  },

  componentDidMount: function() {
    var self = this;

    window.ee.addListener('News.add', function(item) {
      var nextNews = item.concat(self.state.news);
      self.setState({news: nextNews});
    });

    window.ee.addListener('News.delete', function (index) {
      var nextNews = self.state.news;
      nextNews.splice(index, 1);
      self.replaceState({news: nextNews});
    });
  },

  componentWillUnmount: function() {
    window.ee.removeListener('News.add');
    window.ee.removeListener('News.delete');
  },

  render: function() {
    return (
      <div className="app">
          <h2>News</h2>
          <Add/>
          <br/>
          <News data={this.state.news}/>
      </div>
    );
  }
});

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);

console.dir(window.ee);
