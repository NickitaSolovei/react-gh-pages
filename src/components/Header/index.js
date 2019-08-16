import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderComponent from './Header';

class Header extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();

    //
    this.getNameFromLocalStorage = this.getNameFromLocalStorage.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
  }


  componentDidMount() {
    this.getNameFromLocalStorage();
  }

  // getNameFromLocalStorage = () => {
  //   const userName = this.props.getUserNameFromLocalStorage();
  //   this.inputRef.current.value = userName;
  // }
  getNameFromLocalStorage() {
    const userName = this.props.getUserNameFromLocalStorage();
    this.inputRef.current.value = userName;
  }


  // onNameChange = () => {
  //   localStorage.setItem('userName', this.inputRef.current.value);
  // }
  onNameChange() {
    localStorage.setItem('userName', this.inputRef.current.value);
  }

  render() {
    return (
      <HeaderComponent
        onNameChange={this.onNameChange}
        inputRef={this.inputRef}
        {...this.props}
      />
    );
  }
}


const mapStateToProps = (state) => ({
  shared: state.shared,
});

const mapDispatchToProps = () => ({

});


export default connect(mapStateToProps, mapDispatchToProps)(Header);
