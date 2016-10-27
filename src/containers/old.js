/* eslint-disable */

const notes = [
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

/* eslint-enable */

window.ee = new EventEmitter();

class Article extends Component {
  constructor() {
    super()
    this.state = { hidden: true }
  }
  readMoreClick(e) {
    e.preventDefault();
    this.setState({ hidden: false });
  }
  articleDeleteClick() {
    this.setState({ hidden: true });
    const index = this.props.data.index;
    window.ee.emit('News.delete', index);
  }
  render() {
    const { author, text, bigText } = this.props.data
    const hidden = this.state.hidden

    return (
      <div className='article'>
        <div
          className='delete__btn' onClick={::this.articleDeleteClick}
        >[x]</div>

        <p className='news__author'>{author}:</p>
        <p className='news__text'>{text}</p>
        <a href='#'
          onClick={::this.readMoreClick}
          className={'news__readmore' + (hidden ? '' : ' hidden')}>
          More..
        </a>
        <p className={'news__big-text' + (hidden ? ' hidden' : '')}>{bigText}</p>
      </div>
    )
  }
}

Article.propTypes = {
  data: React.PropTypes.shape({
    author: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    bigText: React.PropTypes.string.isRequired,
    index: React.PropTypes.number.isRequired
  })
}

class News extends Component {
  render() {
    const data = this.props.data;
    let newsTemplate;

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
      <div className='news'>
        {newsTemplate}
        <br/>
        <b className={'news__count' + (data.length > 0 ? '' : ' hidden')}>
          Total news count: {data.length}
        </b>
      </div>
    )
  }
}

News.propTypes = {
  data: React.PropTypes.array.isRequired
}

class Add extends Component {
  constructor() {
    super()
    this.state = { btnIsDisabled: true }
  }
  onBtnClickHandler(e) {
    e.preventDefault();
    const author = this.refs.author.value;
    const text = this.refs.text.value;
    const bigText = this.refs.bigText.value;

    const item = [{
      author: author,
      text: text,
      bigText: bigText
    }];

    window.ee.emit('News.add', item);
  }
  onValidate() {
    const author = this.refs.author.value.trim();
    const text = this.refs.text.value.trim();
    const bigText = this.refs.bigText.value.trim();
    const agree = this.refs.agree.checked;

    if (author && text && bigText && agree) {
      this.setState({ btnIsDisabled: false });
    } else {
      this.setState({ btnIsDisabled: true });
    }
  }
  render() {
    return (
      <form>
        <input
          type='text' className='add__author'
          defaultValue='' placeholder='Author'
          ref='author' onChange={::this.onValidate}
        />
        <textarea
          type='textarea' className='add__text'
          defaultValue='' placeholder='Preview'
          ref='text' onChange={::this.onValidate}
        ></textarea>
        <textarea
          type='textarea' className='add__text'
          defaultValue='' placeholder='Text'
          ref='bigText' onChange={::this.onValidate}
        ></textarea>
        <label className='add__checkrule'>
          <input type='checkbox' ref='agree'
           onChange={::this.onValidate}/> I agree with rules
        </label>
        <button
          className='add__btn' onClick={::this.onBtnClickHandler}
          ref='add_btn' disabled={this.state.btnIsDisabled}
        >Add</button>
      </form>
    )
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = { news: notes }
  }
  componentDidMount() {
    let self = this;

    window.ee.on('News.add', function(item) {
      let nextNews = item.concat(self.state.news);
      self.setState({ news: nextNews });
    });

    window.ee.on('News.delete', function (index) {
      let nextNews = self.state.news;
      nextNews.splice(index, 1);
      self.setState({ news: null });
      self.setState({ news: nextNews });
    });
  }
  componentWillUnmount() {
    window.ee.off('News.add');
    window.ee.off('News.delete');
  }
  render() {
    return (
      <div className='app'>
          <h2>Notes list</h2>
          <Add/>
          <br/>
          <News data={this.state.news}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    page: state.page
  }
}

function mapDispatchToProps(dispatch) {
  return {
    pageActions: bindActionCreators(pageActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
