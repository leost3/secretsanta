import Registration from './js/models/Registration';
import { elements } from './js/views/base';
import {
  renderParticipants,
  displayMessage,
  clearMessage,
  whoDidIpick,
  clearMyPick
} from './js/views/drawMembers';
import { match } from './js/models/Matches';
import Draw from './js/models/Draws';

const state = {};

elements.registerInput.addEventListener('focus', e => {
  // alert(this);
});

window.addEventListener('load', () => {
  state.participants = new Registration();
  // state.participants.retrieveParticipantsFromLocalStorate();
  // console.log(state.participants.registeredMembers);
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
      console.log('Please type spouse');
      elements.spouseNameInput.classList.add('inputBlank');
    } else {
      clearTimeout();
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
      setTimeout(clearMessage, 3000);
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

  console.log(membersAndSpouses);
  console.log(membersNames);
  console.log(state.participants.registeredMembers);
  // passes array of membersnames, and memberss names + spouses
  if (state.participants.registeredMembers.length > 1) {
    state.matches = new match(membersAndSpouses, membersNames);
    state.matches.drawMatches();
    elements.icon.classList.add('draw-submited');
  } else {
    alert('At least two members have to be registered');
  }
});

elements.seeDrawForm.addEventListener('submit', e => {
  e.preventDefault();
  const santa = elements.seeDrawInput.value.trim();
  console.log(state.matches === undefined);
  if (state.matches !== undefined) {
    state.draws = new Draw(state.matches.matches);
    if (santa.length) {
      clearMyPick();

      state.draws.findDraw(santa);
      whoDidIpick(state.draws.myDraw.picks);
    } else {
      console.log('type something');
    }
  } else {
    clearMyPick();

    whoDidIpick('Please submit the draw first');
  }
});
