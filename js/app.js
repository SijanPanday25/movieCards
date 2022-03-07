let movieData = []

fetch('https://imdb-api.com/en/API/Top250Movies/k_3lbc4eph')
.then((res) => res.json())
.then((data) => {
  // console.log(data);
  funcLocalData(data.items);
  funcCards(movieData);
});

//==========================================================
// Local copy of the data 

funcLocalData = (movies) => {
  movies.map((m)=> {
    movieData.push ({
      id: m.id,
      image: m.image,
      title: m.title,
      year: m.year,
      imDbRating: m.imDbRating,
      likes: 0,
      Comments: '',
    });
  });

  // console.log(movieData);
};
//==========================================================

//==========================================================
// Create card 

funcCards = (newMovieData) => {

  let tempCardData = '';
  newMovieData.map((nmd)=> {
    tempCardData += ` <div class="movieCard">
    <img 
      src="${nmd.image}" 
      alt="${nmd.title}" 
    />
    <div class="movieCardDetails">
      <h2>${nmd.title}</h2>
      <p>${nmd.year}</p>
      <p>IMDB Rating: <span>${nmd.imDbRating}</span></p>
      ${nmd.Comments ? `<p><span style="font-weight: bold">Comment:</span>${nmd.Comments}</p>` : ''}
      <div class="movieCardSocial">
        <a href="#" onClick="funcLike('${nmd.id}')"><i class="fas fa-heart ${nmd.likes ? 'likeHeart' : ''} "></i></a>
        <a href="https://www.imdb.com/title/${nmd.id}/" target="_blank"><i class="fas fa-share-alt"></i></a>
        <a href="#" onClick="funcComment('${nmd.id}')"><i class="fas fa-comment ${nmd.Comments ? 'commented' : ''}"></i></a>
      </div>
    </div>
    </div>`;
  })
  
  document.querySelector('body').innerHTML = tempCardData; 

};

//==========================================================

//==========================================================
//  Likes Clicked

funcLike = (i) => {
  //console.log(i);

  movieData = movieData.map((m) => {
    if (m.id === i) {
      m.likes += 1;
    }
    return m;
  });
  // console.log(movieData);

  movieData.sort(function (a, b){
    return b.likes - a.likes;
  });

  funcCards(movieData);
};

//==========================================================

//==========================================================
//  Submit A comment

funcComment = (i) => {
  // console.log('comment', i);

  let tempComment = prompt('Submit your comment');
  
  console.log(tempComment);

  movieData = movieData.map((m) => {
    if (m.id === i) {
      m.Comments = tempComment;
    }
    return m;
  });

  // console.log(movieData);

  funcCards(movieData);
};

//==========================================================

