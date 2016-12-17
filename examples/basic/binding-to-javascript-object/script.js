(function() {

  'use strict'

  angular
    .module('exampleApp',
      ['uiDeniTreeview']
    )
    .controller('exampleController', exampleController);

  function exampleController() {

    this.items = [
      {
        id: 1,
        text: 'Mammals',
        children: [
          {
            id: 1,
            text: 'Tiger',
            isLeaf: true
          },
          {
            id: 2,
            text: 'African elephant',
            isLeaf: true
          },
          {
            id: 3,
            text: 'Blue whale',
            isLeaf: true
          },
          {
            id: 4,
            text: 'Bornean orangutan',
            isLeaf: true
          },
          {
            id: 5,
            text: 'Giant panda',
            isLeaf: true
          },
          {
            id: 6,
            text: 'Giant panda',
            isLeaf: true
          },
          {
            id: 7,
            text: 'Giant panda',
            isLeaf: true
          },
        ]
      },
      {
        id: 2,
        text: 'Birds',
        children: [
          {
            id: 8,
            text: 'King penguin',
            isLeaf: true
          },
          {
            id: 9,
            text: 'African grey parrot',
            isLeaf: true
          },
          {
            id: 10,
            text: 'Ostrich',
            isLeaf: true
          }
        ]
      },
      {
        id: 3,
        text: 'Reptiles',
        children: [
          {
            id: 11,
            text: 'Komodo dragon',
            isLeaf: true
          },
          {
            id: 12,
            text: 'Hawksbill turtle',
            isLeaf: true
          },
        ]
      },
      {
        id: 4,
        text: 'Amphibians',
        children: [
          {
            id: 13,
            text: 'Purple frog',
            isLeaf: true
          },
          {
            id: 14,
            text: 'Lemur leaf frog',
            isLeaf: true
          },
        ]
      }
    ];

  };

})();
