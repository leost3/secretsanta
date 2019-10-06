import Registration from './js/models/Registration';
import { elements } from './js/views/base';
import {
  renderParticipants,
  displayMessage,
  clearMessage,
  whoDidIpick,
  clearMyPick,
  clearMembers
} from './js/views/drawMembers';
import { match } from './js/models/Matches';
import Draw from './js/models/Draws';

const state = {};

window.addEventListener('load', () => {
  state.participants = new Registration();
  state.participants.retrieveParticipantsFromLocalStorate();
  if (state.participants.registeredMembers) {
    renderParticipants(state.participants.registeredMembers);
  }
  console.log(state.participants.registeredMembers);
});

elements.registerForm.addEventListener('submit', e => {
  e.preventDefault();
  if (elements.registerInput.value.length) {
    const memberName = elements.registerInput.value.trim();
    const hasSpouse = elements.radioHasSpouse.checked;
    const spouseName = hasSpouse ? elements.spouseNameInput.value.trim() : null;

    if (
      elements.radioHasSpouse.checked &&
      !elements.spouseNameInput.value.length
    ) {
      elements.spouseNameInput.classList.add('inputBlank');
    } else {
      clearTimeout(clearMsg);
      clearMessage();
      const participants = state.participants.registerNewMember(
        memberName,
        hasSpouse,
        spouseName
      );
      const messageMember = hasSpouse
        ? `${memberName} and ${spouseName} have been registered`
        : `${memberName} has been registered`;
      const finalMessage = participants
        ? `${memberName} already registered`
        : messageMember;
      displayMessage(finalMessage);
      const clearMsg = setTimeout(clearMessage, 3000);
      elements.registerInput.value = '';
      elements.spouseNameInput.value = '';
      elements.registerInput.focus();
      renderParticipants(state.participants.registeredMembers);
      elements.registerInput.classList.remove('inputBlank');
      elements.spouseNameInput.classList.remove('inputBlank');
    }
  } else {
    elements.registerInput.classList.add('inputBlank');
    elements.spouseNameInput.classList.add('inputBlank');

    console.log('Please type something');
  }
});

elements.makeDraws.addEventListener('click', e => {
  e.preventDefault();

  const membersAndSpouses = state.participants.registeredMembers.map(member => [
    member.memberName,
    member.spouseName
  ]);

  const membersNames = state.participants.registeredMembers.map(
    member => member.memberName
  );

  // passes array of membersnames, and memberss names + spouses
  if (state.participants.registeredMembers.length > 1) {
    state.matches = new match(membersAndSpouses, membersNames);
    state.matches.assignSantas();
    elements.icon.classList.add('draw-submited');
  } else {
    alert('At least two members have to be registered');
  }
});

elements.seeDrawForm.addEventListener('submit', e => {
  e.preventDefault();

  const santa = elements.seeDrawInput.value.trim();
  const isSantaInTheList = state.participants.registeredMembers.find(
    member => member.memberName === santa
  );

  if (state.matches !== undefined && santa.length > 0) {
    if (isSantaInTheList !== undefined) {
      state.draws = new Draw(state.matches.matches);
      clearMyPick();
      state.draws.findDraw(santa);
      whoDidIpick(`Congrats, your draw is: ${state.draws.myDraw.picks}`);
      console.log(elements.seeDrawInput.innerHTML);
      elements.seeDrawInput.value = '';
    } else {
      clearMyPick();
      whoDidIpick('Sorry, your name is not in the list');
    }
  } else {
    clearMyPick();
    whoDidIpick('Please submit the draw first');
  }
});

elements.resetBtn.addEventListener('click', e => {
  e.preventDefault();
  localStorage.clear();
  state.participants.registeredMembers = [];
  clearMyPick();
  clearMembers();
});
