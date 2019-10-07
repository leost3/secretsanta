import Registration from './js/models/Registration';
import { elements } from './js/views/base';
import {
  renderParticipants,
  displayMessage,
  clearMessage,
  whoDidIpick,
  clearMyPick,
  clearMembers,
  drawMessage,
  clearDrawMessage
} from './js/views/drawMembers';
import Match from './js/models/Matches';
import Draw from './js/models/Draws';

const state = {};

window.addEventListener('load', () => {
  state.participants = new Registration();
  state.participants.retrieveParticipantsFromLocalStorate();
  state.matches = new Match();
  state.matches.retrieveMatchesFromLocalStorage();
  if (state.participants.registeredMembers) {
    renderParticipants(state.participants.registeredMembers);
  }
  if (Object.entries(state.matches.matches).length > 0) {
    elements.icon.classList.add('draw-submited');
  }
});

function clearItAll() {
  elements.registerInput.value = '';
  elements.spouseNameInput.value = '';
  elements.registerInput.focus();
  elements.registerInput.classList.remove('inputBlank');
  elements.spouseNameInput.classList.remove('inputBlank');
  elements.icon.classList.remove('draw-submited');
}

function clearMatches() {
  state.matches.matches = [];
  state.matches.memberAndSpouse = [];
  state.matches.members = [];
}

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
      renderParticipants(state.participants.registeredMembers);
      const clearMsg = setTimeout(clearMessage, 3000);
      clearItAll();
      if (state.matches) {
        clearMatches();
      }
    }
  } else {
    elements.registerInput.classList.add('inputBlank');
    elements.spouseNameInput.classList.add('inputBlank');
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
  if (state.participants.registeredMembers.length > 2) {
    state.matches = new Match(membersAndSpouses, membersNames);
    state.matches.assignSantas();
    elements.icon.classList.add('draw-submited');
    drawMessage();
    clearMyPick();
    setTimeout(() => {
      clearDrawMessage();
    }, 2000);
  } else {
    alert('At least three members have to be registered');
  }
});

elements.seeDrawForm.addEventListener('submit', e => {
  e.preventDefault();

  const santa = elements.seeDrawInput.value.trim();
  const isSantaInTheList = state.participants.registeredMembers.find(
    member => member.memberName === santa
  );

  if (state.matches !== undefined) {
    if (santa.length > 0) {
      if (isSantaInTheList !== undefined) {
        state.draws = new Draw(state.matches.matches);
        clearMyPick();
        state.draws.findDraw(santa);
        whoDidIpick(`Congrats, your draw is: ${state.draws.myDraw.picks}`);
        elements.seeDrawInput.value = '';
      } else {
        clearMyPick();
        whoDidIpick('Sorry, your name is not in the list');
      }
    } else {
      whoDidIpick('Please, enter your name');
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
  elements.icon.classList.remove('draw-submited');
  clearMyPick();
  clearMembers();
});
