import React, {useState} from 'react';
import './App.css';
import {
  InputGroup, 
  Input, 
  InputGroupAddon, 
  Button, 
  FormGroup,
  Label,
  Spinner
} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import BookCard from './BookCard.jsx';

function App() {
  // states
  const [maxResults, setMaxResults] = useState(20);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);

  // handles search
  const handleSubmit = () => {
    setLoading(true)
    if (maxResults > 50 || maxResults < 1) {
      toast.error('max results must be between 1 and 50');
    } else {
      axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}`
        )
        .then(res => {
          // console.log(res.data); // outputs resulting list of books from querying google books api
          if (res.data.items.length > 0) {
            setCards(res.data.items);
            setLoading(false);
          }
        })
        .catch(err => {
          //console.log(err);
          setLoading(true);
          toast.error(`${err.response.data.error.message}`)
        });
    }
  }

  // display bookshelf image background with search bar and filters
  const mainHeader = () => {
    return (
      <div className='main-image d-flex justify-content-center align-items-center flex-column'>
        {/* Overlay */}
        <div className="filter"></div>  
        <h1 className='display-2 text-center text-white mb-3' style={{zIndex:2}}>
          Bookreads Plus   
        </h1>
        <div style={{ width: '50%', zIndex: 2}}>
          <InputGroup size='lg' className='mb-3'>
            <Input 
              placeholder='What book are you looking for?'
              value={query}
              onChange={e => setQuery(e.target.value)} 
            />
            <InputGroupAddon addonType='append'>
              <Button color='secondary' onClick={handleSubmit}>
                <i className='fas fa-search'></i>
              </Button>
          </InputGroupAddon>
          </InputGroup>
          <div className='d-flex text-white justify-content-center'>
            <FormGroup className='ml-5'>
              <Label for='maxResults'>Max Results</Label>
              <Input 
                type='number' 
                id='maxResults' 
                placeholder='Max Results'
                value={maxResults}
                onChange={e => setMaxResults(e.target.value)} 
              />
            </FormGroup>
            
          </div>
        </div>     
      </div>
    )
  }
  
  const handleCards = () => {
    console.log(cards);
    if (loading) {
      return (
        <div className='d-flex justify-content-center mt-3'>
          <Spinner style={ {width: '3rem', height: '3rem'} }/>
        </div>
      );
    } else {
      const items = cards.map((item,i) => {
        let thumbnail = '';
        if (item.volumeInfo.imageLinks.thumbnail) {
          thumbnail = item.volumeInfo.imageLinks.thumbnail;
        }
        return(
          <div className="col-lg-4" key={ item.id }>
            <BookCard 
              thumbnail={thumbnail}
              title={item.volumeInfo.title}
              pageCount={item.volumeInfo.pageCount}
              language={item.volumeInfo.language}
              authors={item.volumeInfo.authors}
              publisher={item.volumeInfo.publisher}
              categories={item.volumeInfo.categories}
              description={item.volumeInfo.description}
              previewLink={item.volumeInfo.previewLink}
              infoLink={item.volumeInfo.infoLink}
            />
          </div>
        );
      });
      return (
        <div className='container my-5'>
          <div className='row'>{items}</div>
        </div>
      );
    }
  };

  return (
    <div>
      {mainHeader()}
      {handleCards()}
      <ToastContainer />
    </div>
  );
}

export default App;
