var	my_news	=	[
		{
				author:	'Yves G',
				text:	"I didn't try the food. I wasn't there to eat, but to relax.",
        bigText: 'Just passed the Consumer Review Fairness Act to prevent companies from using gag orders to stop customers from writing honest reviews online.'

		},
		{
				author:	'Jonathan Haynes',
				text:	'I worked at Lorem Ipsum full-time (More than a year)',
        bigText: "On Friday the company buys lunches for everyone. But they've also decreased how much they will cover over time. It went from $20, down to $15 before tip then down to $15 with tip."
		},
		{
				author:	'Steve Campion',
				text:	'62% of job seekers feel better about companies that respond to reviews',
        bigText: 'Astonishing result from blind resume reviews by tech companies. Should this become a best practice in hiring?'
		}
];

var Article = React.createClass({
  propTypes: {
    data: React.PropTypes.shape({
      author: React.PropTypes.string.isRequired,
      text: React.PropTypes.string.isRequired,
      bigText: React.PropTypes.string.isRequired
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

  render: function() {
    var author = this.props.data.author,
        text = this.props.data.text,
        bigText = this.props.data.bigText,
				hidden = this.state.hidden;

    return (
      <div className="article">
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
        return (
  				<div key={index}>
  						<Article data={item}/>
  				</div>
        )
      })
    } else {
      newsTemplate = function() {
        return (
          <p>No news</p>
        )
      }
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

var TopForm = React.createClass({

	onBtnClickHandler: function() {
		console.log(ReactDOM.findDOMNode(this.refs.testInput).value);
		console.dir(this);
	},

	render: function() {
		return (
			<div>
				<input className='test-input'
				 placeholder='Enter a value'
				 defaultValue=''
				 ref='testInput'/>
				<input className='test-button'
				 type='button'
				 value='send'
				 onClick={this.onBtnClickHandler}/>
			</div>
		);
	}
});

var	App	=	React.createClass({
	render:	function() {
		return (
			<div className="app">
					<h2>News</h2>
					<TopForm/>
          <br/><br/>
          <News data={my_news}/>
			</div>
		);
	}
});

ReactDOM.render(
		<App/>,
		document.getElementById('root')
);
