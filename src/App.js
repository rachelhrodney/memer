
import React from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import SearchIcon from '@material-ui/icons/Search'
import LinearProgress from 'react-bootstrap/ProgressBar';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

class App extends React.Component {

  state = {
    memes: [],
    loading: false,
    text: '',
  }

  getMemes = async (e) => {
    e.preventDefault()
    this.setState({ loading: true, memes: [] })
    var key = 'jhQazp87aPuMIRIZoFu2kaI2Uk5GjZRJ'
    var url = `http://api.giphy.com/v1/gifs/search?q=${this.state.text}&api_key=${key}`
    var r = await fetch(url)
    var json = await r.json()
    this.setState({ memes: json.data, loading: false, text: '' })
  }

  render() {
    var { memes, loading, text } = this.state
    return (
      <div className="App">
        <div className="Header"> Your Memeing Library</div>
        <form className="App-header" onSubmit={this.getMemes}>
          <InputGroup className="mb-3">
            <FormControl
              autoFocus
              value={text}
              placeholder="Search for memes...    :)"
              onChange={e=> this.setState({text: e.target.value})}
              aria-describedby="basic-addon2"
            />
            <InputGroup.Append>
              <Button variant="outline-primary"
                type="submit"
                disabled={loading || !text} >
                <SearchIcon />Search</Button>
            </InputGroup.Append>
          </InputGroup>
        </form>
        {loading && <LinearProgress striped variant="success" now={40} />}
        <main>
          {memes.map(meme => {
            return <Meme key={meme.id} meme={meme} />
          })}
        </main>
      </div>
    );
  }
}

function Meme(props) {
  const { meme } = props
  const url = meme.images.fixed_height.url
  return (<div className="meme-wrap" onClick={() => window.open(url, '_blank')}>
    <img height="200" alt="meme" src={url} />
  </div>)
}

export default App;
