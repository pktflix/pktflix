 const firebaseConfig = {
  apiKey: "AIzaSyAS11X8mZDlVZUy2qhzijO35dS4q7GhQtg",
  authDomain: "pktflix2.firebaseapp.com",
  projectId: "pktflix2",
  storageBucket: "pktflix2.firebasestorage.app",
  messagingSenderId: "45953017812",
  appId: "1:45953017812:web:006ac4868de1f216ea9841"
};
firebase.initializeApp(firebaseConfig);
  const hitCounter = document.getElementById("hit-counter");
hitCounter.style.display = "none";
  const db = firebase.database().ref("totalHits");
db.on("value", (snapshot) => {
  hitCounter.textContent = snapshot.val();  
});
  db.transaction(
  (totalHits) => totalHits + 1,
  (error) => {
    if (error) {
      console.log(error);
    } else {
      hitCounter.style.display = "inline-block";
    }
  }
);
