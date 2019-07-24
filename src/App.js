import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search'

class App extends React.Component {

  state = {
    memes: [],
    loading: false,
    text: '',
  }

  getMemes = async (e) => {
    e.preventDefault()
    this.setState({ loading: true })
    var key = 'Vw1o9GtamNFrwciOojAdm7wAv59Da7pZ'
    var url = `http://api.giphy.com/v1/gifs/search?q=${this.state.text}&api_key=${key}`
    var r = await fetch(url)
    var json = await r.json()
    this.setState({ memes: json.data, loading: false })
  }

  render() {
    var { memes, loading, text } = this.state
    return (
      <div className="App">
        <form className="App-header" onSubmit={this.getMemes}>
          <TextField value={text}
            autoFocus 
            ref={r=> this.input=r}
            variant="outlined"
            label="Search for memes"
            onChange={e => this.setState({ text: e.target.value })}
            style={{width: '100%',marginLeft:8}} //How can I change the height here?
         />
          <Button variant="contained"
            disabled={loading || !text}
            color="primary"
            type="submit"
            style={{width:100, margin:'0 10px', height:50}}
            >
          <SearchIcon/>
            Search
            </Button>
        </form>
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
