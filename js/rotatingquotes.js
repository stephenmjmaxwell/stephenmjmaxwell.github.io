var QofD = new Array(
  'You can easily judge the character of a man by how he treats those who can do nothing for him.</br>- Johann Wolfgang von Goethe',
   'If a group of beings from another planet were to land on Earth - beings who considered themselves as superior to you as you feel yourself to be to other animals - would you concede them the rights over you that you assume over other animals?</br>- George Bernard Shaw',
    'But for the sake of some little mouthful of flesh we deprive a soul of the sun and light, and of that proportion of life and time it had been born into the world to enjoy.</br>- Plutarch',
    'I am not interested to know whether vivisection produces results that are profitable to the human race or doesn\'t...The pain which it inflicts upon unconsenting animals is the basis of my enmity toward it, and it is to me sufficient justification of the enmity without looking further.</br>- Mark Twain',
    'A new scientific truth does not triumph by convincing its opponents and making them see the light, but rather because its opponents eventually die, and a new generation grows up that is familiar with it.</br>- Max Planck',
    'The only reason people do not know much is because they do not care to know. They are incurious. Incuriosity is the oddest and most foolish failing there is.</br>- Stephen Fry',
'');

function setQofD() {
  var r = Math.floor(Math.random()*(QofD.length-1));
  document.getElementById('QOD').innerHTML = QofD[r];
}