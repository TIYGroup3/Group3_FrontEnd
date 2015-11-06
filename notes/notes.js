  // deckDetail(id) {
    let titleThing = Cookies.get('user');
    let ttObj = JSON.parse(titleThing);
    console.dir(ttObj.deck.id);

    ReactDom.render(
      <Table 
      people={Data}
      title={ttObj.deck.title}
      onSubmitClick={() => this.navigate('addCard', {trigger: true})}/>,
      document.querySelector('.app')
    );
  }


addCard() {
    let titleThing = Cookies.get('user');
    let ttObj = JSON.parse(titleThing);
    console.dir(ttObj.deck.title);
    
    console.log(Cookies.get('user'));
    let request = $.ajax({
      url: `https://guarded-ridge-7410.herokuapp.com/decks/:id/cards`,
      method: 'POST',
      data: {
        deck_id: ttObj.deck.id,
        front: $('#cardFront').val(),
        back: $('#cardBack').val(),
      },
      headers: {
        'Access-Key': JSON.parse(Cookies.get('user')).user.access_key
      }
    });
    $('.app').html('loading...');
    request.then((data) => {
      console.log('data:', data);
      Cookies.set('user', data);
      $.ajaxSetup({
        headers: {
          auth_token: data.access_token
        }
      });
      this.redirect('deckDetail/:id');
    }).fail(() => {
      $('.app').html('Oops..');
    });
  }, 







// search card api for all decks with id of ttObj.deck.id
// return those cards
















// <div className="container">
//   <div className="deckTitle">{}</div>
//   <div className="addCard">
//     <p>Add a Card</p>
//     <div className="cardInputs">
//       <div className="front">
//         <label>Front:</label>
//         <input type="text" />
//       </div>
//       <div className="back">
//         <label>Back:</label>
//         <input type="text"/>
//       </div>
//       <button></button>
//     </div>
//   </div>



// </div>

// textarea not input