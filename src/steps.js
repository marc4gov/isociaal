function makeCard (title, label, description, tags, color = "orange") {
    let i=0
    console.log("color ", color)
    const tgs = tags.map((tag) =>  {
        let obj = {}
        obj["key"] = title + "_" + i++
        obj["title"] = tag
        obj["bgcolor"] = color
        return obj
    })
    const newcard = {
        id: title,
        title: title,
        label: label,
        description: description,
        tags: tgs
    }
    return newcard
}


exports.steps = function (casus, description, gemeente, zorgaanbieder, client = 'Client') {
    let steps = []
    switch(casus) {
        case 1:
            steps.push({type: 'ADD_CARD',laneId: 'ZORGAANBIEDER', card: makeCard('1. Toewijzing', gemeente, description, ['301-302'])})
            steps.push({type: 'ADD_CARD',laneId: 'CLIENT', card: makeCard('1. Beschikking', gemeente, description, ['Brief'])})
            steps.push({type: 'ADD_CARD',laneId: 'CLIENT', card: makeCard('2. ...', client, 'Tijd verstrijkt', ['4 maanden'], '#EB5A46')})
            steps.push({type: 'ADD_CARD',laneId: 'CLIENT', card: makeCard('3. Client ontvangt zorg', zorgaanbieder, description, [''])})          
            steps.push({type: 'ADD_CARD',laneId: 'GEMEENTE', card: makeCard('2. ..', '4 maanden', 'Tijd verstrijkt', ['4 maanden'], '#EB5A46')})
            steps.push({type: 'ADD_CARD',laneId: 'GEMEENTE', card: makeCard('3. Start Zorg', zorgaanbieder, description, ['305-306'])})
            steps.push({type: 'ADD_CARD',laneId: 'ZORGAANBIEDER', card: makeCard('4. Uitvalbericht', gemeente, description, ['306a'])})
            steps.push({type: 'ADD_CARD',laneId: 'ZORGAANBIEDER', card: makeCard('5. Navraag', '', description, ['306a'])})
            steps.push({type: 'ADD_CARD',laneId: 'GEMEENTE', card: makeCard('6. Uitleg', 'Regel', 'Na 3 maanden na 301 geen start zorg, 301 ingetrokken', ['Inkoopcontract p. 18'], '#EB5A46')})
            steps.push({type: 'ADD_CARD',laneId: 'GEMEENTE', card: makeCard('7. ...', '2 weken', 'Afstemming ' + zorgaanbieder + "-" + gemeente,['2 weken'], '#EB5A46')})
            steps.push({type: 'ADD_CARD',laneId: 'CLIENT', card: makeCard('7. ..', client, 'Client onvangt wellicht geen zorg', ['2 weken'], '#EB5A46')})

            steps.push({type: 'ADD_CARD',laneId: 'ZORGAANBIEDER', card: makeCard('8. Toewijzing', gemeente, description, ['301-302'])})
            steps.push({type: 'ADD_CARD',laneId: 'CLIENT', card: makeCard('9. Client ontvangt zorg', zorgaanbieder, description, [''])})
            steps.push({type: 'ADD_CARD',laneId: 'GEMEENTE', card: makeCard('10. Start Zorg', zorgaanbieder, description, ['305-306'])})
            break;

    case 11:
            steps.push({type: 'ADD_CARD',laneId: 'ZORGAANBIEDER', card: makeCard('1: Verwijzing', gemeente, 'Verwijzing GI', ['315-316'])})
            steps.push({type: 'ADD_CARD',laneId: 'GEMEENTE', card: makeCard('2. Navraag', zorgaanbieder, 'Geen contract met ' + zorgaanbieder, ['Geen contract'], '#EB5A46')})
            steps.push({type: 'ADD_CARD',laneId: 'ZORGAANBIEDER', card: makeCard('3: Reactie', gemeente, 'Geen contract, wel verwijzing en WBP', [])})
            steps.push({type: 'ADD_CARD',laneId: 'GEMEENTE', card: makeCard('4. Beoordeling', 'Toegang', 'Toegang vergelijkt zorgaanbieders', [])})
            steps.push({type: 'ADD_CARD',laneId: 'GEMEENTE', card: makeCard('5. Administratie', 'Inkoop', zorgaanbieder + ' wordt opgenomen in administratie', [])})
            steps.push({type: 'ADD_CARD',laneId: 'ZORGAANBIEDER', card: makeCard('6: Administratie', gemeente, 'Formulier terug', [])})
            steps.push({type: 'ADD_CARD',laneId: 'GEMEENTE', card: makeCard('7. Afstemming', gemeente, 'Inkoop-BO-ICT-Financiële administratie', [])})
            steps.push({type: 'ADD_CARD',laneId: 'ZORGAANBIEDER', card: makeCard('8. Toewijzing', gemeente, description, ['301-302'])})
            steps.push({type: 'ADD_CARD',laneId: 'CLIENT', card: makeCard('8. Beschikking', gemeente, description, ['Brief'])})
            steps.push({type: 'ADD_CARD',laneId: 'CLIENT', card: makeCard('9. Client ontvangt zorg', zorgaanbieder, description, [])})               
            steps.push({type: 'ADD_CARD',laneId: 'GEMEENTE', card: makeCard('10. Start Zorg', zorgaanbieder, description, ['305-306'])})
            steps.push({type: 'ADD_CARD',laneId: 'GEMEENTE', card: makeCard('11. 307-308 berichten', zorgaanbieder, description, ['307-308'])})
            steps.push({type: 'ADD_CARD',laneId: 'GEMEENTE', card: makeCard('12. Declaratie', zorgaanbieder, description, ['303-304'])})      
            break;            

    case 12:
            steps.push({type: 'ADD_CARD',laneId: 'CLIENT', card: makeCard('1. Client heeft zorgvraag', zorgaanbieder, description, [])})
            steps.push({type: 'ADD_CARD',laneId: 'CLIENT', card: makeCard('2. Client wacht', gemeente, '........', ['Tijd verstrijkt'], '#EB5A46')})
            steps.push({type: 'ADD_CARD',laneId: 'GEMEENTE', card: makeCard('2. Indicatie', 'Toegang', 'Toegang maakt indicatie/aanvraag', [])})
            steps.push({type: 'ADD_CARD',laneId: 'GEMEENTE', card: makeCard('3. Beoordeling', 'BO', 'BO beoordeelt aanvraag', ['Niet compleet'], '#EB5A46')})
            steps.push({type: 'ADD_CARD',laneId: 'ZORGAANBIEDER', card: makeCard('4: Navraag', gemeente, 'Waar blijft 301?', ['301 ?'])})
            steps.push({type: 'ADD_CARD',laneId: 'GEMEENTE', card: makeCard('5. Navraag', 'Toegang', 'BO: Aanvraag niet compleet', ['Niet compleet'], '#EB5A46')})
            steps.push({type: 'ADD_CARD',laneId: 'GEMEENTE', card: makeCard('6: Reparatie', 'Toegang', 'Toegang maakt aanvraag compleet', [])})
            steps.push({type: 'ADD_CARD',laneId: 'ZORGAANBIEDER', card: makeCard('7. Toewijzing', gemeente, description, ['301-302'])})
            steps.push({type: 'ADD_CARD',laneId: 'CLIENT', card: makeCard('7. Beschikking', gemeente, description, ['Brief'])})
            steps.push({type: 'ADD_CARD',laneId: 'CLIENT', card: makeCard('8. Client ontvangt zorg', zorgaanbieder, description, [])})               
            steps.push({type: 'ADD_CARD',laneId: 'GEMEENTE', card: makeCard('9. Start Zorg', zorgaanbieder, description, ['305-306'])})
            steps.push({type: 'ADD_CARD',laneId: 'GEMEENTE', card: makeCard('10. 307-308 berichten', zorgaanbieder, description, ['307-308'])})
            steps.push({type: 'ADD_CARD',laneId: 'GEMEENTE', card: makeCard('11. Declaratie', zorgaanbieder, description, ['303-304'])})      
            break;
        case 3:
            break;
        default:
    } 
    return steps
}

exports.stepsFuture = function (casus) {
    let steps = []
    switch(casus) {
        case 1:
            steps.push({type: 'REMOVE_CARD',laneId: 'ZORGAANBIEDER', cardId: '1: Toewijzing'})
            steps.push({type: 'REMOVE_CARD',laneId: 'CLIENT', cardId: '2: ...'})
            steps.push({type: 'REMOVE_CARD',laneId: 'CLIENT', cardId: '3: Client ontvangt zorg'})
            
            steps.push({type: 'REMOVE_CARD',laneId: 'GEMEENTE', cardId: '2: ..'})
            steps.push({type: 'REMOVE_CARD',laneId: 'GEMEENTE', cardId: '3: Start Zorg'})
            steps.push({type: 'REMOVE_CARD',laneId: 'ZORGAANBIEDER', cardId: '4: Uitvalbericht'})
            steps.push({type: 'REMOVE_CARD',laneId: 'ZORGAANBIEDER', cardId: '5: Navraag'})
            steps.push({type: 'REMOVE_CARD',laneId: 'GEMEENTE', cardId: '6: Uitleg'})
            steps.push({type: 'REMOVE_CARD',laneId: 'GEMEENTE', cardId: '7: ...'})
            steps.push({type: 'REMOVE_CARD',laneId: 'CLIENT', cardId: '7: ..'})

            steps.push({type: 'REMOVE_CARD',laneId: 'ZORGAANBIEDER', cardId: '8: Toewijzing'})
            steps.push({type: 'REMOVE_CARD',laneId: 'CLIENT', cardId: '9: Client ontvangt zorg'})
            steps.push({type: 'REMOVE_CARD',laneId: 'GEMEENTE', cardId: '10: Start Zorg'})
    case 2:
            break;
        case 3:
            break;
        default:
    } 
    return steps
}

module.exports.makeCard = makeCard