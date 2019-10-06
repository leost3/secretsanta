import { elements } from './base';

function displayParticipants(participant) {
  const markup = `
        <li><h4>${participant.memberName}</h4></li>
    `;

  elements.participantsView.insertAdjacentHTML('afterbegin', markup);
}

export const renderParticipants = registeredParticipants => {
  clearMembers();
  registeredParticipants.forEach(displayParticipants);
};

export const clearMembers = () => (elements.participantsView.innerHTML = '');

export const displayMessage = message => {
  const markup = `
  <h4>${message}</h4>
  `;
  elements.messageBox.insertAdjacentHTML('afterbegin', message);
};

export const clearMessage = () => {
  elements.messageBox.innerHTML = '';
};

export const whoDidIpick = myPick => {
  const markup = `
  <div class="myPick-box">
    <h4>${myPick}</h4>
  </div>`;

  elements.myPick.insertAdjacentHTML('afterbegin', markup);
};

export const clearMyPick = () => {
  console.log('pick cleared');
  elements.myPick.innerHTML = '';
};
