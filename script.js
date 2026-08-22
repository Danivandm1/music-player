const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');
const btnExit = document.querySelector('#btnExit')
const search = document.getElementById('search')
const form = document.getElementById('form')

// Song titles
const songs = ['Without Me','Dastam Begir  Faramarz Aslani','Beautiful - Eminem','Shabaneh Yek - Farhad','St!ll Lov!ng You - Cover(Rhythmic Mind)','In The Pool','Calaverada - Gipsy Kings'];

let previous = null;

const previousArr=[];
let test = 0;
// baraye randome entekhab random.
let songIndex = Math.floor(Math.random() * songs.length);

loadSong(songs[songIndex]);
previousArr.push(songs[songIndex]);

//random baraye function pervSong va nextSong
function randomNumber(){
	let songIndex = Math.floor(Math.random() * songs.length);
	let randomSong = songs[songIndex];
	

	if(randomSong==previous){

        return randomNumber();
	}
		previous = randomSong;

		console.log(previousArr);

		previousArr.splice(test+1);

		//baraye azafe kardan esm ahang dar previousArr
        previousArr.push(previous);

		test++;

		loadSong(randomSong);
}

// Initially load song details into DOM

// Update song details
function loadSong(song) {
  title.innerText = song;
  console.log(song);
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}
// Play song (kheli mohem)
async function playSong() {
   musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

 await audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  songIndex = Math.floor(Math.random() * songs.length);

  audio.pause();
}

// Previous song
function prevSong() {

	test--;

  if (test < 0) {
	previousArr.length = 0;
	randomNumber();
	playSong();
	return;
  }
  loadSong(previousArr[test]);
  playSong();
}

// Next song
function nextSong() {
	// songIndex++;

	// if(songIndex > songs.length){
    //    songIndex = 0;
	// }
  randomNumber();

  playSong();

}





// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
//   console.log(e.srcElement);
//   console.log({ duration, currentTime });
  const progressPercent = (currentTime / duration) * 100;
//   console.log(currentTime / duration,"zarb 100", (currentTime / duration) *100,"in;", currentTime,"oon", duration);
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
	console.log(this,this.clientWidth);
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  console.log("e",e,"audio:",audio)

  console.log(clickX,width,duration)
  audio.currentTime = (clickX / width) * duration;
  console.log(audio.currentTime);
}

//get duration & currentTime for Time of song
  function DurTime (e) {
	const {duration,currentTime} = e.srcElement;
	var sec;
	var sec_d;

	// define minutes currentTime
	let  min =(currentTime==null)? null: Math.floor(currentTime/60);
	 min = min <10 ? '0'+min:min;

	// define seconds currentTime
	function get_sec (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec = Math.floor(x) - (60*i);
					sec = sec <10 ? '0'+sec:sec;
				}
			}
		}else{
		 	sec = Math.floor(x);
		 	sec = sec <10 ? '0'+sec:sec;
		 }
	} 

	get_sec (currentTime,sec);


	// change currentTime DOM
	currTime.innerHTML = min +':'+ sec;

	// define minutes duration
	let min_d = (isNaN(duration) === true)? '0':
		Math.floor(duration/60);
	 min_d = min_d <10 ? '0'+min_d:min_d;


	 function get_sec_d (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec_d = Math.floor(x) - (60*i);
					sec_d = sec_d <10 ? '0'+sec_d:sec_d;
				}
			}
		}else{
		 	sec_d = (isNaN(duration) === true)? '0':
		 	Math.floor(x);
		 	sec_d = sec_d <10 ? '0'+sec_d:sec_d;
		 }
	} 

	// define seconds duration
	
	get_sec_d (duration);

	// change duration DOM
	durTime.innerHTML = min_d +':'+ sec_d;
		
};

// Event listeners
playBtn.addEventListener('click', () => {

	//classlist.contains bar assas boodan ya naboodan class play, meghdar boolean mide
  const isPlaying = musicContainer.classList.contains('play');
  console.log(typeof isPlaying );

  console.log(isPlaying);

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);


// search.addEventListener('focus', function() {
// 	document.querySelector('.search').classList.add('show');
// });
// search.addEventListener('mouseout', function(){
//   document.querySelector('.search').classList.remove('show')
// });

//  btnExit.addEventListener('click', function() {
//  	document.querySelector('.search').classList.remove('show');
//  });

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);

// Time of song
audio.addEventListener('timeupdate',DurTime);

form.addEventListener('submit', e => {
  e.preventDefault();
})
