function makeCard (title, label, description, tags, color = "orange") {
    let i=0
    const tgs = tags.map((tag) =>  {
        let obj = {}
        obj["key"] = tag
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
            steps.push({type: 'ADD_CARD',laneId: 'ZORGAANBIEDER', card: makeCard('1. Verzoek Toewijzing', gemeente, description, ['301-302'])})
            steps.push({type: 'ADD_CARD',laneId: 'CLIENT', card: makeCard('1. Beschikking', gemeente, description, ['Brief'])})
            steps.push({type: 'ADD_CARD',laneId: 'CLIENT', card: makeCard('2. ...', client, 'Tijd verstrijkt', ['4 maanden'], '#EB5A46')})
            steps.push({type: 'ADD_CARD',laneId: 'CLIENT', card: makeCard('3. Client ontvangt zorg', zorgaanbieder, description, [''])})          
            steps.push({type: 'ADD_CARD',laneId: 'GEMEENTE', card: makeCard('2. ....', '4 maanden', 'Tijd verstrijkt', ['4 maanden'], '#EB5A46')})
            steps.push({type: 'ADD_CARD',laneId: 'GEMEENTE', card: makeCard('3. Start Zorg', zorgaanbieder, description, ['305-306'])})
            steps.push({type: 'ADD_CARD',laneId: 'ZORGAANBIEDER', card: makeCard('4. Uitvalbericht', gemeente, description, ['306a'])})
            steps.push({type: 'ADD_CARD',laneId: 'ZORGAANBIEDER', card: makeCard('5. Navraag', '', description, ['306a'])})
            steps.push({type: 'ADD_CARD',laneId: 'GEMEENTE', card: makeCard('6. Uitleg', 'Regel', 'Na 3 maanden na 301 geen start zorg, 301 ingetrokken', ['Inkoopcontract p. 18'], '#EB5A46')})
            steps.push({type: 'ADD_CARD',laneId: 'GEMEENTE', card: makeCard('7. ...', '2 weken', 'Afstemming ' + zorgaanbieder + "-" + gemeente,['2 weken'], '#EB5A46')})
            steps.push({type: 'ADD_CARD',laneId: 'CLIENT', card: makeCard('7. ....', client, 'Client onvangt wellicht geen zorg', ['2 weken'], '#EB5A46')})

            steps.push({type: 'ADD_CARD',laneId: 'ZORGAANBIEDER', card: makeCard('8. Toewijzing', gemeente, description, ['301-302'])})
            steps.push({type: 'ADD_CARD',laneId: 'CLIENT', card: makeCard('9. Client ontvangt zorg', zorgaanbieder, description, [''])})
            steps.push({type: 'ADD_CARD',laneId: 'GEMEENTE', card: makeCard('10. Start Zorg', zorgaanbieder, description, ['305-306'])})
            break;
        case 2:
            steps.push({type: 'ADD_CARD',laneId: 'ZORGAANBIEDER', card: makeCard('1: Verzoek toewijzing', gemeente, 'Verwijzing medisch domein', ['315-316'])})
            steps.push({type: 'ADD_CARD',laneId: 'GEMEENTE', card: makeCard('2. Toewijzing', zorgaanbieder, 'Afwijkende productcode', ['301 Afwijkende productcode'], '#EB5A46')})
            steps.push({type: 'ADD_CARD',laneId: 'ZORGAANBIEDER', card: makeCard('3: Reactie', gemeente, 'Denkt alles is ok', ['302'])})
            steps.push({type: 'ADD_CARD',laneId: 'GEMEENTE', card: makeCard('4. Start Zorg', zorgaanbieder, description, ['305-306 uitval'], '#EB5A46')})
            steps.push({type: 'ADD_CARD',laneId: 'GEMEENTE', card: makeCard('5. Stop Zorg', zorgaanbieder, description, ['307-308 uitval'], '#EB5A46')})
            steps.push({type: 'ADD_CARD',laneId: 'GEMEENTE', card: makeCard('6. Declaratie', zorgaanbieder, description, ['303-304 uitval'], '#EB5A46')})      
            steps.push({type: 'ADD_CARD',laneId: 'ZORGAANBIEDER', card: makeCard('7: Administratie', gemeente, 'Ziet uitval belt gemeente', [])})
            steps.push({type: 'ADD_CARD',laneId: 'GEMEENTE', card: makeCard('8. Afstemming', gemeente, 'BO-Zorgaanbieder/BO-gemeente-Financiële administratie', [])})
            steps.push({type: 'ADD_CARD',laneId: 'ZORGAANBIEDER', card: makeCard('9. Wijziging doorvoeren', gemeente, 'Aangepast 315 bericht', ['315-316'])})
            steps.push({type: 'ADD_CARD',laneId: 'GEMEENTE', card: makeCard('10. Toewijzing', zorgaanbieder, description, ['301-302'])})
            steps.push({type: 'ADD_CARD',laneId: 'GEMEENTE', card: makeCard('11. Start Zorg', zorgaanbieder, description, ['305-306'])})
            steps.push({type: 'ADD_CARD',laneId: 'ZORGAANBIEDER', card: makeCard('12. Stop Zorg', gemeente, description, ['307-308'])})
            steps.push({type: 'ADD_CARD',laneId: 'ZORGAANBIEDER', card: makeCard('13. Declaratie', gemeente, description, ['303-304'])})      
            break;  
        case 10:
            steps.push({type: 'ADD_CARD',laneId: 'ZORGAANBIEDER', card: makeCard('1. Verzoek toewijzing', gemeente, 'Verwijzing medisch domein', ['315-316 uitval'], '#EB5A46')})
            steps.push({type: 'ADD_CARD',laneId: 'GEMEENTE', card: makeCard('2. Afstemming', zorgaanbieder, 'Productcode onbekend', ['Productcode onbekend'], '#EB5A46')})
            steps.push({type: 'ADD_CARD',laneId: 'ZORGAANBIEDER', card: makeCard('3. Reactie', gemeente, 'Product staat wel in standaarden', [])})
            steps.push({type: 'ADD_CARD',laneId: 'GEMEENTE', card: makeCard('4. Afstemming', gemeente, 'BO-Zorgaanbieder/Inkoop-productenboek', ['Afwijkend productenboek'], '#EB5A46')})
            steps.push({type: 'ADD_CARD',laneId: 'ZORGAANBIEDER', card: makeCard('5. Verzoek toewijzing', gemeente, 'Indiceren naar afwijkend productenboek', ['315-316'])})
            steps.push({type: 'ADD_CARD',laneId: 'GEMEENTE', card: makeCard('6. Toewijzing', zorgaanbieder, description, ['301-302'])})
            steps.push({type: 'ADD_CARD',laneId: 'GEMEENTE', card: makeCard('7. Start Zorg', zorgaanbieder, description, ['305-306'])})
            steps.push({type: 'ADD_CARD',laneId: 'ZORGAANBIEDER', card: makeCard('8. Stop Zorg', gemeente, description, ['307-308'])})
            steps.push({type: 'ADD_CARD',laneId: 'ZORGAANBIEDER', card: makeCard('9. Declaratie', gemeente, description, ['303-304'])})      
            break;             


    case 11:
            steps.push({type: 'ADD_CARD',laneId: 'ZORGAANBIEDER', card: makeCard('1. Verzoek toewijzing', gemeente, 'Verwijzing GI', ['315-316'])})
            steps.push({type: 'ADD_CARD',laneId: 'GEMEENTE', card: makeCard('2. Navraag', zorgaanbieder, 'Geen contract met ' + zorgaanbieder, ['Geen contract'], '#EB5A46')})
            steps.push({type: 'ADD_CARD',laneId: 'ZORGAANBIEDER', card: makeCard('3. Reactie', gemeente, 'Geen contract, wel verwijzing en WBP', [])})
            steps.push({type: 'ADD_CARD',laneId: 'GEMEENTE', card: makeCard('4. Beoordeling', 'Toegang', 'Toegang vergelijkt zorgaanbieders', [])})
            steps.push({type: 'ADD_CARD',laneId: 'GEMEENTE', card: makeCard('5. Administratie', 'Inkoop', zorgaanbieder + ' wordt opgenomen in administratie', [])})
            steps.push({type: 'ADD_CARD',laneId: 'ZORGAANBIEDER', card: makeCard('6. Administratie', gemeente, 'Formulier terug', [])})
            steps.push({type: 'ADD_CARD',laneId: 'GEMEENTE', card: makeCard('7. Afstemming', gemeente, 'Inkoop-BO-ICT-Financiële administratie', [])})
            steps.push({type: 'ADD_CARD',laneId: 'ZORGAANBIEDER', card: makeCard('8. Toewijzing', gemeente, description, ['301-302'])})
            steps.push({type: 'ADD_CARD',laneId: 'CLIENT', card: makeCard('8. Beschikking', gemeente, description, ['Brief'])})
            steps.push({type: 'ADD_CARD',laneId: 'CLIENT', card: makeCard('9. Client ontvangt zorg', zorgaanbieder, description, [])})               
            steps.push({type: 'ADD_CARD',laneId: 'GEMEENTE', card: makeCard('10. Start Zorg', zorgaanbieder, description, ['305-306'])})
            steps.push({type: 'ADD_CARD',laneId: 'GEMEENTE', card: makeCard('11. Stop Zorg', zorgaanbieder, description, ['307-308'])})
            steps.push({type: 'ADD_CARD',laneId: 'GEMEENTE', card: makeCard('12. Declaratie', zorgaanbieder, description, ['303-304'])})      
            break;            

    case 12:
            steps.push({type: 'ADD_CARD',laneId: 'CLIENT', card: makeCard('1. Client heeft zorgvraag', zorgaanbieder, description, [])})
            steps.push({type: 'ADD_CARD',laneId: 'CLIENT', card: makeCard('2. Client wacht', gemeente, '........', ['Tijd verstrijkt'], '#EB5A46')})
            steps.push({type: 'ADD_CARD',laneId: 'GEMEENTE', card: makeCard('2. Indicatie', 'Toegang', 'Toegang maakt indicatie/aanvraag', [])})
            steps.push({type: 'ADD_CARD',laneId: 'GEMEENTE', card: makeCard('3. Beoordeling', 'BO', 'BO beoordeelt aanvraag', ['Niet compleet'], '#EB5A46')})
            steps.push({type: 'ADD_CARD',laneId: 'ZORGAANBIEDER', card: makeCard('4: Navraag', gemeente, 'Waar blijft 301?', ['301 ?'])})
            steps.push({type: 'ADD_CARD',laneId: 'GEMEENTE', card: makeCard('5. Navraag', 'Toegang', 'BO: Aanvraag niet compleet', ['Niet compleet'], '#EB5A46')})
            steps.push({type: 'ADD_CARD',laneId: 'GEMEENTE', card: makeCard('6. Reparatie', 'Toegang', 'Toegang maakt aanvraag compleet', [])})
            steps.push({type: 'ADD_CARD',laneId: 'ZORGAANBIEDER', card: makeCard('7. Toewijzing', gemeente, description, ['301-302'])})
            steps.push({type: 'ADD_CARD',laneId: 'CLIENT', card: makeCard('7. Beschikking', gemeente, description, ['Brief'])})
            steps.push({type: 'ADD_CARD',laneId: 'CLIENT', card: makeCard('8. Client ontvangt zorg', zorgaanbieder, description, [])})               
            steps.push({type: 'ADD_CARD',laneId: 'GEMEENTE', card: makeCard('9. Start Zorg', zorgaanbieder, description, ['305-306'])})
            steps.push({type: 'ADD_CARD',laneId: 'GEMEENTE', card: makeCard('10. Stop Zorg', zorgaanbieder, description, ['307-308'])})
            steps.push({type: 'ADD_CARD',laneId: 'GEMEENTE', card: makeCard('11. Declaratie', zorgaanbieder, description, ['303-304'])})      
            break;
        default:
    } 
    return steps
}

exports.stepsFuture = function (casus, gemeente, afspraken = []) {
    let steps = []
    switch(casus) {
        case 1:
            steps.push({type: 'REMOVE_CARD',laneId: 'ZORGAANBIEDER', cardId: '1. Verzoek Toewijzing'})
            steps.push({type: 'REMOVE_CARD',laneId: 'CLIENT', cardId: '1. Beschikking'})
            
            steps.push({type: 'REMOVE_CARD',laneId: 'CLIENT', cardId: '2. ...'})
            steps.push({type: 'REMOVE_CARD',laneId: 'CLIENT', cardId: '3. Client ontvangt zorg'})
            
            steps.push({type: 'REMOVE_CARD',laneId: 'GEMEENTE', cardId: '2. ....'})
            steps.push({type: 'REMOVE_CARD',laneId: 'GEMEENTE', cardId: '3. Start Zorg'})
            steps.push({type: 'REMOVE_CARD',laneId: 'ZORGAANBIEDER', cardId: '4. Uitvalbericht'})
            steps.push({type: 'REMOVE_CARD',laneId: 'ZORGAANBIEDER', cardId: '5. Navraag'})
            steps.push({type: 'REMOVE_CARD',laneId: 'GEMEENTE', cardId: '6. Uitleg'})
            steps.push({type: 'REMOVE_CARD',laneId: 'GEMEENTE', cardId: '7. ...'})
            steps.push({type: 'REMOVE_CARD',laneId: 'CLIENT', cardId: '7. ....'})

            steps.push({type: 'REMOVE_CARD',laneId: 'ZORGAANBIEDER', cardId: '8. Toewijzing'})
            steps.push({type: 'REMOVE_CARD',laneId: 'CLIENT', cardId: '9. Client ontvangt zorg'})
            steps.push({type: 'REMOVE_CARD',laneId: 'GEMEENTE', cardId: '10. Start Zorg'})
            break;

        case 2:
            steps.push({type: 'REMOVE_CARD',laneId: 'ZORGAANBIEDER', cardId: '1: Verzoek toewijzing'})
            steps.push({type: 'REMOVE_CARD',laneId: 'GEMEENTE', cardId: '2. Toewijzing'})
            steps.push({type: 'REMOVE_CARD',laneId: 'ZORGAANBIEDER', cardId: '3: Reactie'})
            steps.push({type: 'REMOVE_CARD',laneId: 'GEMEENTE', cardId: '4. Start Zorg'})
            steps.push({type: 'REMOVE_CARD',laneId: 'GEMEENTE', cardId: '5. Stop Zorg'})
            steps.push({type: 'REMOVE_CARD',laneId: 'GEMEENTE', cardId: '6. Declaratie'})      
            steps.push({type: 'REMOVE_CARD',laneId: 'ZORGAANBIEDER', cardId: '7: Administratie'})
            steps.push({type: 'REMOVE_CARD',laneId: 'GEMEENTE', cardId: '8. Afstemming'})
            steps.push({type: 'REMOVE_CARD',laneId: 'ZORGAANBIEDER', cardId: '9. Wijziging doorvoeren'})
            steps.push({type: 'REMOVE_CARD',laneId: 'GEMEENTE', cardId: '10. Toewijzing'})
            steps.push({type: 'REMOVE_CARD',laneId: 'GEMEENTE', cardId: '11. Start Zorg'})
            steps.push({type: 'REMOVE_CARD',laneId: 'ZORGAANBIEDER', cardId: '12. Stop Zorg'})
            steps.push({type: 'REMOVE_CARD',laneId: 'ZORGAANBIEDER', cardId: '13. Declaratie'})      
            break;  
        case 10:
            steps.push({type: 'REMOVE_CARD',laneId: 'ZORGAANBIEDER', cardId: '1. Verzoek toewijzing'})
            steps.push({type: 'REMOVE_CARD',laneId: 'GEMEENTE', cardId: '2. Afstemming'})
            steps.push({type: 'REMOVE_CARD',laneId: 'ZORGAANBIEDER', cardId: '3. Reactie'})
            steps.push({type: 'REMOVE_CARD',laneId: 'GEMEENTE', cardId: '4. Afstemming'})
            steps.push({type: 'REMOVE_CARD',laneId: 'ZORGAANBIEDER', cardId: '5. Verzoek toewijzing'})
            steps.push({type: 'REMOVE_CARD',laneId: 'GEMEENTE', cardId: '6. Toewijzing'})
            steps.push({type: 'REMOVE_CARD',laneId: 'GEMEENTE', cardId: '7. Start Zorg'})
            steps.push({type: 'REMOVE_CARD',laneId: 'ZORGAANBIEDER', cardId: '8. Stop Zorg'})
            steps.push({type: 'REMOVE_CARD',laneId: 'ZORGAANBIEDER', cardId: '9. Declaratie'})      
            break;    
        case 11:
            steps.push({type: 'REMOVE_CARD',laneId: 'ZORGAANBIEDER', cardId:  '1. Verzoek toewijzing'})
            steps.push({type: 'REMOVE_CARD',laneId: 'GEMEENTE', cardId:  '2. Navraag'})
            steps.push({type: 'REMOVE_CARD',laneId: 'ZORGAANBIEDER', cardId:  '3. Reactie'})
            steps.push({type: 'REMOVE_CARD',laneId: 'GEMEENTE', cardId:  '4. Beoordeling'})
            steps.push({type: 'REMOVE_CARD',laneId: 'GEMEENTE', cardId:  '5. Administratie'})
            steps.push({type: 'REMOVE_CARD',laneId: 'ZORGAANBIEDER', cardId:  '6. Administratie'})
            steps.push({type: 'REMOVE_CARD',laneId: 'GEMEENTE', cardId:  '7. Afstemming'})
            steps.push({type: 'REMOVE_CARD',laneId: 'ZORGAANBIEDER', cardId:  '8. Toewijzing'})
            steps.push({type: 'REMOVE_CARD',laneId: 'CLIENT', cardId:  '8. Beschikking'})
            steps.push({type: 'REMOVE_CARD',laneId: 'CLIENT', cardId:  '9. Client ontvangt zorg'})               
            steps.push({type: 'REMOVE_CARD',laneId: 'GEMEENTE', cardId:  '10. Start Zorg'})
            steps.push({type: 'REMOVE_CARD',laneId: 'GEMEENTE', cardId:  '11. Stop Zorg'})
            steps.push({type: 'REMOVE_CARD',laneId: 'GEMEENTE', cardId:  '12. Declaratie'})      
            break;         
        case 12:
            steps.push({type: 'REMOVE_CARD',laneId: 'CLIENT', cardId: '1. Client heeft zorgvraag'})
            steps.push({type: 'REMOVE_CARD',laneId: 'CLIENT', cardId: '2. Client wacht'})
            steps.push({type: 'REMOVE_CARD',laneId: 'GEMEENTE', cardId: '2. Indicatie'})
            steps.push({type: 'REMOVE_CARD',laneId: 'GEMEENTE', cardId: '3. Beoordeling'})
            steps.push({type: 'REMOVE_CARD',laneId: 'ZORGAANBIEDER', cardId:  '4: Navraag'})
            steps.push({type: 'REMOVE_CARD',laneId: 'GEMEENTE', cardId:  '5. Navraag'})
            steps.push({type: 'REMOVE_CARD',laneId: 'GEMEENTE', cardId:  '6. Reparatie'})
            steps.push({type: 'REMOVE_CARD',laneId: 'ZORGAANBIEDER', cardId:  '7. Toewijzing'})
            steps.push({type: 'REMOVE_CARD',laneId: 'CLIENT', cardId:  '7. Beschikking'})
            steps.push({type: 'REMOVE_CARD',laneId: 'CLIENT', cardId:  '8. Client ontvangt zorg'})               
            steps.push({type: 'REMOVE_CARD',laneId: 'GEMEENTE', cardId:  '9. Start Zorg'})
            steps.push({type: 'REMOVE_CARD',laneId: 'GEMEENTE', cardId:  '10. Stop Zorg'})
            steps.push({type: 'REMOVE_CARD',laneId: 'GEMEENTE', cardId:  '11. Declaratie'})      
            break;
        default:
            break;
    } 
    steps.push({type: 'ADD_CARD',laneId: 'ZORGAANBIEDER', card: makeCard('1: Contractafspraken', gemeente, 'Zorgaanbieder onderhandelt met ' + gemeente + ' over Afspraakkaarten', afspraken, '#EB5A46' )})
    return steps
}

module.exports.makeCard = makeCard