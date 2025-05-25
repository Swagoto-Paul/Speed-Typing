const paragraph=[
    "Technology has transformed modern life, making communication faster, work more efficient, and daily tasks easier. From smartphones to smart homes, innovation continues to shape how we live and interact. With rapid advancements in artificial intelligence and automation, the future promises even greater changes that will redefine convenience, productivity, and connectivity.",
    "Education empowers individuals by providing knowledge, skills, and opportunities. It shapes critical thinking and helps people contribute meaningfully to society. With advancements in digital learning, access to education has expanded globally. Education not only improves personal development but also drives economic growth and social progress across nations.",
    "Climate change is a growing concern, impacting weather patterns, ecosystems, and human life. Rising temperatures, melting ice caps, and extreme weather events threaten biodiversity and food security. Urgent actions like reducing carbon emissions, embracing renewable energy, and sustainable living are essential to mitigate its effects and protect our planet.",
    "Books open doors to imagination, knowledge, and new worlds. They help readers explore diverse perspectives, improve vocabulary, and develop empathy. Whether fiction or non-fiction, books enrich the mind and offer a break from digital screens. Regular reading fosters lifelong learning and inspires creativity in both young and old.",
    "Exercise is vital for maintaining physical and mental health. Regular workouts improve cardiovascular strength, flexibility, and immunity. They also help reduce stress, anxiety, and depression. Whether through walking, yoga, or sports, staying active ensures better overall well-being and enhances quality of life at every age.",
    "Friendship is a priceless bond built on trust, understanding, and mutual respect. True friends support each other in good and bad times, offering comfort and joy. They celebrate successes and help cope with failures. Strong friendships enrich life, promote emotional health, and create lasting memories.",
    "Music has the power to heal, inspire, and connect. It transcends language, bringing people together through shared rhythms and melodies. Whether classical, pop, or folk, music expresses emotions words often cannot. It plays a vital role in cultural identity, personal expression, and mental well-being.",
    "Travel broadens the mind by exposing individuals to new cultures, traditions, and landscapes. It encourages curiosity, adaptability, and global awareness. Whether exploring historical sites or natural wonders, travel creates unforgettable experiences. It also helps people appreciate diversity and develop a deeper understanding of the world.",
    "Time management is key to personal and professional success. Prioritizing tasks, setting goals, and avoiding procrastination lead to increased productivity. Good time management reduces stress and helps maintain a work-life balance. Developing this skill can lead to more achievements and a more organized life.",
    "Healthy eating is essential for a strong body and mind. A balanced diet rich in fruits, vegetables, proteins, and whole grains boosts immunity and prevents diseases. It also supports mental clarity and energy levels. Making mindful food choices leads to long-term wellness and vitality.",
    "Social media connects people globally, enabling instant sharing of thoughts, news, and creativity. It offers platforms for expression and learning. However, excessive use can lead to anxiety and distraction. Using social media responsibly helps maintain mental health and fosters meaningful digital interactions.",
    "The Internet is a powerful tool for communication, learning, and innovation. It allows instant access to information and connects people worldwide. From education to business, the Internet has revolutionized how we live and work. However, digital safety and privacy must be prioritized in this connected age.",
    "Family provides love, support, and a sense of belonging. It forms the foundation of a person’s emotional development and values. In times of joy or hardship, family remains a pillar of strength. Spending quality time with family builds stronger relationships and lasting memories.",
    "Art is a form of self-expression that reflects emotions, culture, and imagination. From painting to dance, art helps people communicate ideas and tell stories. It inspires creativity, promotes mental well-being, and adds beauty to life. Engaging with art enhances appreciation of diverse human experiences.",
    "Discipline is the bridge between goals and achievement. It involves self-control, responsibility, and consistency. Whether in studies, work, or habits, discipline helps individuals stay focused and efficient. Developing discipline fosters personal growth and paves the way for long-term success and confidence.",
    "Volunteering promotes kindness, empathy, and social responsibility. By offering time and skills, individuals can make a positive impact on communities. It also provides personal satisfaction, builds character, and enhances teamwork. Volunteering is a powerful way to contribute to a better world.",
    "Sleep is essential for health and recovery. It allows the body and brain to recharge, improving memory, mood, and concentration. Poor sleep can lead to stress and health problems. Establishing a consistent sleep routine promotes better mental and physical well-being.",
    "Technology in healthcare has improved diagnosis, treatment, and patient care. Innovations like telemedicine, wearable devices, and AI are transforming the medical field. These advancements make healthcare more efficient and accessible. Continued progress promises a healthier future with better outcomes for all.",
    "Public speaking builds confidence and sharpens communication skills. It helps individuals express ideas clearly and influence others. Overcoming the fear of speaking in front of an audience boosts self-esteem and opens doors to leadership opportunities. Practice and preparation are key to effective public speaking.",
    "Learning a new language enhances cognitive abilities and cultural understanding. It improves memory, problem-solving, and communication skills. Multilingual individuals have greater career opportunities and social connections. Language learning fosters global awareness and enriches personal experiences through deeper engagement with different cultures.",
]

const typingText=document.querySelector(".typing p")
const inpField=document.querySelector(".wrapper .input_field")
let mistakesTag=document.querySelector(".mistake span")
let wpmTag=document.querySelector(".wpm span")
let cpmTag=document.querySelector(".cpm span")
let timeTag=document.querySelector(".time span b")
let tryAgain=document.querySelector("button");

let charIndex=mistakes=isTyping=0;
let timer, maxTime=60,timeLeft=maxTime;

function randomParagraph() {
  let randIndex = Math.floor(Math.random() * paragraph.length);
  typingText.innerHTML="";
  // console.log(paragraph[randomIndex]);
  paragraph[randIndex].split("").forEach((span) => {
    let spanTag = `<span>${span}</span>`;
    // console.log(spanTag);
    typingText.innerHTML += spanTag;
  });
  typingText.querySelectorAll("span")[0].classList.add("active");
  document.addEventListener("keydown",()=> inpField.focus());
  typingText.addEventListener("click",()=> inpField.focus());

}

function initTyping(){
    const character=typingText.querySelectorAll("span");
    let typeChar= inpField.value.split("")[charIndex];
    if(charIndex< character.length -1 && timeLeft > 0){
      if(!isTyping){
        timer=setInterval(initTimer,1000)
        isTyping= true;
      }
      // console.log(typeChar);

      if(typeChar==null){
        charIndex--;
        if(character[charIndex].classList.contains("incorrect")){
          mistakes--;
        }
        character[charIndex].classList.remove("correct","incorrect")

      }
      else{
        if(character[charIndex].innerText===typeChar){
          character[charIndex].classList.add("correct")
        }
        else{
          mistakes++;
          character[charIndex].classList.add("incorrect")
        }
        charIndex++;
      }
    }
    else{
      inpField.value="";
      clearInterval(timer)
    }

    character.forEach(span=>span.classList.remove("active"));
    character[charIndex].classList.add("active");
    let wpm=Math.round((((charIndex-mistakes)/5)/(maxTime-timeLeft))*60)
    wpm=wpm<0 || !wpm || wpm==Infinity ? 0 : wpm;

    mistakesTag.innerHTML=mistakes;
    wpmTag.innerHTML=wpm;
    cpmTag.innerText= charIndex-mistakes;    
}

function initTimer(){
  if(timeLeft>0){
    timeLeft--;
    timeTag.innerText=timeLeft
  }else{
    clearInterval(timer)
  }
}

function resetGame(){
  randomParagraph();
  timeLeft=maxTime;
  charIndex=mistakes=isTyping=0;
  timeTag.innerText=timeLeft;
  mistakesTag.innerHTML=mistakes;
  wpmTag.innerHTML=0;
  cpmTag.innerText= 0;
  inpField.value="";
  clearInterval(timer)
}

randomParagraph()


inpField.addEventListener("input", initTyping);
tryAgain.addEventListener("click",resetGame);