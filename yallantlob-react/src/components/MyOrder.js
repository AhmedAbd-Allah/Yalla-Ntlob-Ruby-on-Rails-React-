import React, { Component } from 'react';
import '../index.css';
import 'semantic-ui-css/semantic.min.css';
import { Icon, Button, Grid, Form, Modal, Header, Table, Item, Label} from 'semantic-ui-react'
import Headr from './header'
// import { Link } from 'react-router-dom';
import axios from 'axios';

class MyOrder extends Component {
  constructor(props){
    super(props)
    this.state = {
      myItems:[],
      modalOpen: false 

    }
  }
  
  handleClose = () => this.setState({ modalOpen: false })
  handleOpen = () => this.setState({ modalOpen: true })

  componentWillMount() {
    axios({ method: 'GET',
            url: 'http://localhost:3000/order_items', 
            headers: {'order-id': 3} //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<to merge
          })
      .then(res => {
        const myItems = (res.data.filter(function(item){
          return item.user_id == 5; //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<to merge
        }))
        this.setState({ myItems: myItems });
      })
  }

  addItem = e => {
    e.preventDefault();

    axios({ method: 'POST',
            url: 'http://localhost:3000/order_items', 
            data: { "order_id": 3, //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<to merge
                    "user_id": 5,  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<to merge
                    "item":document.getElementById("name").value,
                    "count": document.getElementById("amount").value,
                    "price": document.getElementById("price").value,
                    "comment":document.getElementById("comment").value
                  }
          })
      .then(res => {
        console.log("added")
        console.log(res)
        this.componentWillMount();

        document.getElementById("name").value = ""
        document.getElementById("amount").value = ""
        document.getElementById("price").value = ""
        document.getElementById("comment").value = ""
      })

  }

  deleteItem = (id) => {
    console.log(id)
    axios ({  method: 'DELETE',
              url:    `http://localhost:3000/order_items/${id}` 
          })

    .then(res => {
      this.setState({ modalOpen: false })
      console.log("Deleted")
      this.componentWillMount();
    })
  }




  render() {
    return (

      <div> 
      <Headr />
      <Grid columns='equal'>
        <Grid.Row>
          <Grid.Column width={1}>
          </Grid.Column>

          <Grid.Column width={8}>
            <Grid.Column >
              <Header as='h2'>
               <Icon name='align center' />
                My Order
              </Header>
            </Grid.Column>
          </Grid.Column>

        </Grid.Row>


        <Grid.Row>
      <Grid.Column width={1}>
        </Grid.Column>

        <Grid.Column width={9}>
          <Table color='red'>
            <Table.Header>
              <Table.Row textAlign='center'>
                <Table.HeaderCell>Item</Table.HeaderCell>
                <Table.HeaderCell>Amount</Table.HeaderCell>
                <Table.HeaderCell>Price</Table.HeaderCell>
                <Table.HeaderCell>Comment</Table.HeaderCell>
                <Table.HeaderCell>Cancel</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
{/****************************Dynamic part****************************/}
              {
                this.state.myItems.map((item) => (
              <Table.Row key={item.item_id} textAlign='center'>
                <Table.Cell>{item.item}</Table.Cell>
                <Table.Cell>{item.count}</Table.Cell>
                <Table.Cell>{item.price}</Table.Cell>
                <Table.Cell>{item.comment}</Table.Cell>
                <Table.Cell>

                <Modal 
                size={'tiny'} 
                trigger={<Button onClick={this.handleOpen} value={item.item_id} icon='delete' size='tiny'/>}
                onClose={this.handleClose}
                open={this.state.modalOpen}
                closeIcon 
                className="modal cancel">

                  <Header icon='attention' content='Cancel item' />
                  <Modal.Content>
                    <h4>Are you sure you want to remove this item from your order?</h4>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button color='green' onClick={this.handleClose}>
                      <Icon name='remove' /> No
                    </Button>
                    <Button color='red'  id= {item.item_id} onClick={this.deleteItem.bind(this, item.item_id)}>
                      <Icon name='checkmark' /> Yes
                    </Button>
                  </Modal.Actions>
                </Modal>

                </Table.Cell>

              </Table.Row>
              ))
              }
{/*****************************************************************/}

            </Table.Body>
          </Table>
        </Grid.Column>


       <Grid.Column >
        <h4><Label circular color={"blue"}>3</Label> of your Friends were invited to this order</h4>



        <Modal size={'mini'} dimmer={'blurring'} trigger={<Button color='grey'>Click to view</Button>} className="modal frnds" >
          <Modal.Header className="modalHead">
            <img src='images/friends.png' alt="" height="40" width="40"/>
            Friends Invited
            </Modal.Header>
          <Modal.Content scrolling>

            <Modal.Description>
              <Item.Group>
                <Item>
                  <Item.Image size='tiny' src="images/person.png" />

                  <Item.Content verticalAlign='middle'>
                    <Item.Header>
                      Veronika Ossi
                      <h4><Icon name='check square' color='green'/>Joined</h4>
                    </Item.Header>
                  </Item.Content>
                </Item>

                <Item>
                  <Item.Image size='tiny' src="images/person.png" />

                  <Item.Content verticalAlign='middle'>
                    <Item.Header>
                      Justen Kitsune
                      <h4><Icon name='exclamation circle' color='grey'/>"Didn't Join"</h4>
                    </Item.Header>
                  </Item.Content>
                </Item>

                <Item>
                  <Item.Image size='tiny' src="images/person.png" />

                  <Item.Content verticalAlign='middle'>
                    <Item.Header>
                      Salem ELmasry
                      <h4><Icon name='check square' color='green'/>Joined</h4>
                    </Item.Header>
                  </Item.Content>
                </Item>
              </Item.Group>

            </Modal.Description>
          </Modal.Content>
        </Modal>

        </Grid.Column>
       </Grid.Row>


      <Grid.Row>
      <Grid.Column width={1}></Grid.Column>

      <Grid.Column width={10}>

      <Form onSubmit = {this.addItem}>
        <Form.Group widths='equal' >
          <Form.Input fluid required label='Item' placeholder='Item name'  width = {15} id="name"/>
          <Form.Field required label='Amount' placeholder='Amount' control='input' type='number' min={1} width = {9} id="amount"/>
          <Form.Field required label='Price' placeholder='Price' control='input' type='number' min={1} width = {9} id="price"/>
          <Form.Field label='Comments' placeholder='Comments' control='input' width = {16} id="comment"/>
          <Form.Button type="submit" label= "&nbsp;" primary>Add</Form.Button>
        </Form.Group>
      </Form>

      </Grid.Column>

    </Grid.Row>

    </Grid>


      </div>




    );
  }
}

export default MyOrder;
