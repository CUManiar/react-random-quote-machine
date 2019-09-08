const projectName = "random-quote-machine";
localStorage.setItem(projectName, 'Random Quote Machine');


class App extends React.Component {
 constructor(props) {
    super(props);
    this.state = {
      allQuotes: [],
      randomQuote: {}
    }

    this.changeQuote = this.changeQuote.bind(this);
    this._onMouseHover = this._onMouseHover.bind(this);
  }

  // Fetches the quote list, converts in json format and allocates to 'allQuotes' state obj
  componentWillMount() {
    fetch("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json")
      .then(res => res.json())
      .then(data => this.setState({ allQuotes: data.quotes, randomQuote: data.quotes[Math.floor(Math.random() * data.quotes.length)] }))
      .catch(err => console.log('This is error', err));
  }

  _onMouseHover = () => console.log('Hovered .... worked !!!');

  changeQuote = () => this.setState({
    randomQuote: this.state.allQuotes[Math.floor(Math.random() * this.state.allQuotes.length)]
  });

  

  render() {
    return (
      <div className="random-quote-box container-fluid col-md-4">

        <h1 id="title"> Random Quote Machine </h1> <hr />

        <div id="quote-box" className="col-md-12 col-sm-12">
          <h3 id="text">{this.state.randomQuote.quote}</h3>
          <h6 id="author" className="text-right">- {this.state.randomQuote.author}</h6>
          <button id="new-quote" onClick={this.changeQuote} className="btn btn-info float-right">New Quote</button>
          <div>
            <a id="tweet-quote" href="twitter.com/intent/tweet" target="_blank" onMouseOver={this._onMouseHover}><i className="fa fa-twitter fa-2x"></i></a>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
