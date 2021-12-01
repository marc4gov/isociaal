import React, {Component} from 'react'

import './App.css'
import Board from 'react-trello'
import update from 'immutability-helper'
import CaseForm from './CaseForm'
import ProductForm from './ProductForm'
import GemeenteForm from './GemeenteForm'
import ZorgaanbiederForm from './ZorgaanbiederForm'
import AfspraakForm from './AfspraakForm'
import {steps, stepsFuture, makeCard} from './steps'

const data = require('./data.json')
const data2 = require('./data2.json')

const products = require('./productcode.json')
const cases = require('./casus.json')

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {boardData: {lanes: []}, 
                        board2Data: {lanes: []},
                        products: [], cases: [], 
                        card: {}, 
                        case: 1, 
                        productCategory: "40",
                        product: "40A01",
                        afspraken: [],
                        gemeente: "De Belevenis",
                        zorgaanbieder: "Theresa",
                        startLaneId: "",
                        endLaneId:""
                    }
    
        this.handleCaseChange = this.handleCaseChange.bind(this);
        this.handleProductCategoryChange = this.handleProductCategoryChange.bind(this);
        this.handleProductChange = this.handleProductChange.bind(this);
        this.handleAfspraakChange = this.handleAfspraakChange.bind(this);
        this.handleGemeenteChange = this.handleGemeenteChange.bind(this);
        this.handleZorgaanbiederChange = this.handleZorgaanbiederChange.bind(this);
        
        this.addCaseCard = this.addCaseCard.bind(this);
        this.playCase = this.playCase.bind(this);
        
        this.addAfspraakCard = this.addAfspraakCard.bind(this);
        this.addDeclaratieCard = this.addDeclaratieCard.bind(this);
      }

      async componentWillMount() {
        const response = await this.getBoard()
        const response4 = await this.getBoard2()
        
        const response2 = await this.getProducts()
        const response3 = await this.getCases()
        
        this.setState({boardData: response, board2Data: response4, products: response2, cases: response3})
    }

    getBoard() {
        return new Promise(resolve => {
            resolve(data)
        })
    }
    getBoard2() {
        return new Promise(resolve => {
            resolve(data2)
        })
    }

    getProducts() {
        return new Promise(resolve => {
            resolve(products)
        })
    }

    getCases() {
        return new Promise(resolve => {
            resolve(cases)
        })
    }

    handleDragStart = (cardId, laneId) => {
        console.log('drag started')
        console.log(`cardId: ${cardId}`)
        console.log(`laneId: ${laneId}`)
        
    }
    
    handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
        console.log('drag ended')
        console.log(`cardId: ${cardId}`)
        console.log(`sourceLaneId: ${sourceLaneId}`)
        console.log(`targetLaneId: ${targetLaneId}`)
        //this.setState({startLaneId: sourceLaneId, endLaneId: targetLaneId})
        const card = this.getCard(sourceLaneId, cardId)
        console.log("Card: ", card)
        if (sourceLaneId === 'INKOOP' && targetLaneId === 'TOEGANG') {
            const newCard = makeCard('2. Indicatiestelling', 'Toegang', card.description, this.state.afspraken, '#EB5A46')
            this.state.eventBus2.publish({type: 'ADD_CARD',laneId: 'GEMEENTE', card: newCard})
        }
        if (sourceLaneId === 'TOEGANG' && targetLaneId === 'TOEWIJZINGEN') {
            const newCard = makeCard('3. Toewijzing', this.state.gemeente, card.description, this.state.afspraken, '#EB5A46')
            this.state.eventBus2.publish({type: 'ADD_CARD',laneId: 'ZORGAANBIEDER', card: newCard})
        }
    }

    setEventBus = eventBus => {
        this.setState({eventBus})
    }

    setEventBus2 = eventBus2 => {
        this.setState({eventBus2})
    }

    setCase() {
        const cases = this.state.cases
        const cs = this.state.case
        const casus = cases.filter((cas) => {return cas.Casus === cs})
        const tgs = Array.from(new Set(casus[0].Berichten.split(" ")))
        return makeCard(casus[0].Naam, this.state.gemeente, casus[0].Actie + "; " + casus[0].Reactie, tgs)
    }

    getLane(laneId) {
        return this.state.boardData.lanes.filter((l) => l.id === laneId)[0]
    }

    getCard(laneId, cardId) {
        const lanes = this.state.boardData.lanes
        const lane = lanes.filter((l) => l.id === laneId)[0]
        console.log("Lane: ", lane)
        return lane.cards.filter((c) => c.id === cardId)[0]
    }

    compareLaneAndCard = (laneId, card) => {
        const lane = this.getLane(laneId)
        const card2 = lane.cards.filter((c) => {
            return c.id.substring(8) === card.id.substring(10)
        })[0]
        return JSON.stringify(card.tags)===JSON.stringify(card2.tags)
    }


    getProduct = (code) => {
        const products = this.state.products
        for (var i = 0; i < products.length; i++){
            if (products[i].Code === code)
                return products[i].Betekenis;
        }
    }

    setAfspraak() {
        const prcode = this.state.product
        const afspraken = this.state.afspraken

        const newcard = {
            id: "Afspraak_" + prcode + "_" + this.state.zorgaanbieder + "_" + this.state.gemeente,
            title: this.state.zorgaanbieder,
            label: this.state.gemeente,
            description: prcode + ": " + this.getProduct(prcode),
            tags: afspraken.map((tag) =>  {
                let obj = {}
                obj["key"] = tag
                obj["title"] = tag
                obj["bgcolor"] = "#EB5A46"
                return obj
            })
        }
        return newcard
    }

    setDeclaratie() {
        const prcode = this.state.product
        const afspraken = this.state.afspraken
        const tgs = afspraken.map((tag) =>  {
            let obj = {}
            obj["key"] = tag
            obj["title"] = tag
            obj["bgcolor"] = "#EB5A46"
            return obj
        })

        // let PQ = {}
        // PQ["title"] = "P:50 x Q:20 = 1000"
        // PQ["bgcolor"] = "#0079BF"
        // tgs.push(PQ)

        const newcard = {
            id: "Declaratie_" + prcode + "_" + this.state.zorgaanbieder + "_" + this.state.gemeente,
            title: this.state.zorgaanbieder,
            label: this.state.gemeente,
            description: prcode + ": " + this.getProduct(prcode) + "        P:50 x Q:20 = 1000",
            tags: tgs
        }
        return newcard
    }

    playCase = () => {
        // console.log("play Case")
        const description = this.state.product + ": " + this.getProduct(this.state.product)
        const stappen = steps(this.state.case, description, this.state.gemeente, this.state.zorgaanbieder)
        stappen.map((stap) => { return this.state.eventBus2.publish(stap)})   
    }
    
    playFuture = () => {
        // console.log("play Future")
        const stappen = stepsFuture(this.state.case, this.state.gemeente, this.state.afspraken)
        stappen.map((stap) => {return this.state.eventBus2.publish(stap)})
    }

    addCaseCard = () => {
        this.state.eventBus.publish({
            type: 'ADD_CARD',
            laneId: 'CASUS',
            card: this.setCase()
        })
        this.playCase()
    }

    addAfspraakCard = () => {
        this.state.eventBus.publish({
            type: 'ADD_CARD',
            laneId: 'INKOOP',
            card: this.setAfspraak()
        })
        this.playFuture()

    }

    addDeclaratieCard = () => { 
        const card = this.setDeclaratie()
        this.state.eventBus.publish({
            type: 'ADD_CARD',
            laneId: 'DECLARATIE',
            card: card
        })
        if (this.compareLaneAndCard('TOEWIJZINGEN',card)) {
            const newCard = card
            let obj = {}
            obj["key"] = card.id
            obj["title"] = '303d'
            obj["bgcolor"] = "orange"
            let tgs = card.tags
            tgs.push(obj)
            const newCard1 = makeCard('4. Declaratie', card.label, card.description, tgs.map((tag => tag.title)))
            this.state.eventBus2.publish({type: 'ADD_CARD', laneId: 'GEMEENTE', card: newCard1})
            obj["title"] = '304'
            tgs.pop()
            tgs.push(obj);
            const newCard2 = makeCard('5. Betaling', card.label, card.description, tgs.map((tag => tag.title)))
            //const newCard2 = update(card, {title: '5. Betaling', tags: {$set: card.tags}})
            this.state.eventBus2.publish({type: 'ADD_CARD', laneId: 'ZORGAANBIEDER', card: newCard2})
            // const newCard2 = card
            // let obj2 = {}
            // obj2["key"] = card.id
            // obj2["title"] = '303d'
            // obj2["bgcolor"] = "orange"
            // let obj3 = {}
            // obj3["key"] = card.id
            // obj3["title"] = 'op tijd'
            // obj3["bgcolor"] = "dodgerblue"
            // const newCard3 = makeCard(card.title, card.label, card.description, card.tags.push([obj2, obj3]))
            // this.state.eventBus2.publish({type: 'ADD_CARD', laneId: 'GEMEENTE', card: newCard3})
        }
    }

    modifyCardTitle = () => {
        const data = this.state.boardData
        const newData = update(data, {lanes: {0: {cards: {0: {tags: {$set: [{"title": "High", "color": "white", "bgcolor": "#EB5A46"}]}}}}}})
        this.setState({boardData: newData})
      }


    shouldReceiveNewData = nextData => {
        // console.log('New card has been added')
        const data = this.state.boardData
        const newData = update(data, {lanes: {$set: nextData.lanes}})
        this.setState({boardData: newData})     
    }

	handleCardAdd = (card, laneId) => {
		// console.log(`New card added to lane ${laneId}`)
        // console.dir(card)

    }

    // handleCardClick = (cardId) => {
    //     console.log(cardId)
    //     const card = this.getCard('DECLARATIE', cardId)
    //     if (this.compareLaneAndCard('TOEWIJZINGEN',card)) {
    //         this.addBerichtCard('303d-304', 'DECLARATIE', card)
    //     }
    // }

    handleCaseChange(casus) {
        // console.log(casus)
        this.setState({case: parseInt(casus)});
    }

    handleProductCategoryChange(pc) {
        this.setState({productCategory: pc});
    }

    handleProductChange(pr) {
        this.setState({product: pr});
    }

    handleAfspraakChange(afs) {
        const afspraken = afs.map((afspraak) => {return afspraak.label})
        this.setState({afspraken: afspraken});
    }

    handleGemeenteChange(gem) {
        this.setState({gemeente: gem});
        const data = this.state.board2Data
        const newData = update(data, {lanes: {2: {label: {$set: gem}}}}) 
        this.setState({board2Data: newData})
    }

    handleZorgaanbiederChange(zb) {
        this.setState({zorgaanbieder: zb});
        const data = this.state.board2Data
        const newData = update(data, {lanes: {1: {label: {$set: zb}}}}) 
        this.setState({board2Data: newData})
    }
 

    render() {     
        return (
            <div className="App">
                <div>
                    <img src={require('./ketenbureau.png')} width="200px" />
                </div>
                {/* <div className="App-intro"> */}
                <div className="wrapper">

                <CaseForm casus={this.state.case} onCaseChange={this.handleCaseChange} />
                <button onClick={this.addCaseCard} style={{margin: 5}}>
                    Voeg Casus toe
                </button>           
                Product
                <ProductForm 
                    products={this.state.products}
                    prcode={this.state.product} 
                    prcat={this.state.productCategory} 
                    afspraak={this.state.afspraak} 
                    onProductChange={this.handleProductChange} 
                    onProductCategoryChange={this.handleProductCategoryChange} 
                    onAfspraakChange={this.handleAfspraakChange}     
                />
                <GemeenteForm gemeente={this.state.gemeente} onGemeenteChange={this.handleGemeenteChange} />
                <ZorgaanbiederForm zorgaanbieder={this.state.zorgaanbieder} onZorgaanbiederChange={this.handleZorgaanbiederChange} />
                <AfspraakForm afspraken={this.state.afspraken} onAfspraakChange={this.handleAfspraakChange} />

                <button onClick={this.addAfspraakCard} style={{margin: 5}}>
                    Maak afspraak
                </button>

                <button onClick={this.addDeclaratieCard} style={{margin: 5}}>
                    Declareer
                </button>

                </div>


                
                    <Board
                        editable
                        onCardAdd={this.handleCardAdd}
                        onCardClick={this.handleCardClick}                
                        data={this.state.boardData}
                        draggable
                        onDataChange={this.shouldReceiveNewData}
                        eventBusHandle={this.setEventBus}
                        handleDragStart={this.handleDragStart}
                        handleDragEnd={this.handleDragEnd}
                        tagStyle={{fontSize: '80%'}}
                        //style={{backgroundColor: 'darkorchid'}}
                        style={{height: "300px", backgroundColor: 'darkorchid'}}
                        
                    />
                    <Board            
                        data={this.state.board2Data}
                        eventBusHandle={this.setEventBus2}
                        tagStyle={{fontSize: '80%'}}
                        style={{backgroundColor: 'dodgerblue'}}
                        
                    />                
            </div>
        )
    }
}
export default App
