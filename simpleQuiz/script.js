const questionElement = document.querySelectorAll("#question");
const answerButtons = document.querySelectorAll(".option");
const easyModeButton = document.querySelectorAll(".easymode");
const abilities = {"Strength": ["Athletics"], "Dexterity" :["Acrobatics", "Sleight of Hand", "Stealth"], "Intelligence": ["Arcana", "History", "Investigation", "Nature", "Religion"], "Wisdom": ["Animal Handling", "Insight", "Medicine", "Perception", "Survival"], "Charisma": ["Deception", "Intimidation", "Performance", "Persuasion"]};
const skills = {"Acrobatics": "Dexterity", "Animal Handling": "Wisdom", "Arcana" : "Intelligence", "Athletics": "Strength", "Deception": "Charisma", "History": "Intelligence", "Insight": "Wisdom", "Intimidation": "Charisma", "Investigation": "Intelligence", "Medicine": "Wisdom", "Nature": "Intelligence", "Perception": "Wisdom", "Performance": "Charisma", "Persuasion": "Charisma", "Religion": "Intelligence", "Sleight of Hand": "Dexterity", "Stealth": "Dexterity", "Survival": "Wisdom"};
let easyMode = false;
let questionType;
let question;
let answers;

window.onload = () => {
	reloadQuestion();
}

reloadQuestion = () => {
	questionType = Math.floor(Math.random() * 2);
	if(easyMode) {questionType = 1;}
	let abilitiesList = Object.keys(abilities);
	let skillsList = Object.keys(skills);

	answers = [];

	if(questionType == 0) {
		//Given skill, guess ability
		question = skillsList[(Math.floor(Math.random() * skillsList.length - 1)) + 1];
		answers = ["Str", "Dex", "Int", "Wis", "Cha"];
		
	} else {
		//Given ability, guess skill
		question = abilitiesList[(Math.floor(Math.random() * abilitiesList.length - 1)) + 1];
		if(easyMode) {question = "Strength"};
		let incorrectAnswers = skillsList.filter(ability => skills[ability] != question);
		for(let i = 0; i < 5; i++) {
			let randomIndex = Math.floor(Math.random() * incorrectAnswers.length);
			answers.push(incorrectAnswers[randomIndex]);
			incorrectAnswers.splice(randomIndex, 1);
		}
		answers[[Math.floor(Math.random() * answers.length)]] = abilities[question][Math.floor(Math.random() * abilities[question].length)];

	}

	questionElement[0].textContent = question;
	for(let i = 0; i < answerButtons.length; i++) {
		answerButtons[i].textContent = answers[i];
	}
}

correctAnswer = () => {
	document.body.style.backgroundColor = "green";
	setTimeout(() => {document.body.style.backgroundColor = "#001e4d";
		reloadQuestion();
	}, 1000);
}

incorrectAnswer = (correctAnswer) => {
	document.body.style.backgroundColor = "red";
	questionElement[0].innerHTML = "<s>" + questionElement[0].textContent + "</s>    " + correctAnswer;
	setTimeout(() => {document.body.style.backgroundColor = "#001e4d";
		reloadQuestion();
	}, 1000);
}

onAnswer = (answer) => {
	let selectedAnswer = answer.textContent;
	let question = questionElement[0].textContent;
	if(questionType == 0) {
		if(skills[question].substring(0,3) == selectedAnswer) {
			correctAnswer();
		} else {
			incorrectAnswer(skills[question].substring(0,3));
		}
	} else {
		if(abilities[question].includes(selectedAnswer)) {
			correctAnswer();
		} else {
			if(answers.filter(answer => skills[answer] == question)[0] == undefined) {
				console.log(question);
				console.log(answers);
			}
			incorrectAnswer(answers.filter(answer => skills[answer] == question)[0]);
		}
	}
}

toggleEasyMode = () => {
	easyMode = !easyMode;
	if(easyMode) {
		easyModeButton[0].style.background = "red";
	} else {
		easyModeButton[0].style.background = "green";
	}
	reloadQuestion();
}
