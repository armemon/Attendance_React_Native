import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: 'lightgreen',
    paddingVertical: 0,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navLogo: {
    width: 100,
    height: 40, // Update with the actual height of your logo
  },
  navbarToggler: {
    padding: 10,
  },
  navbarTogglerIcon: {
    fontSize: 20,
  },
  collapse: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  navbarNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navLink: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    borderColor: 'white',
    borderWidth: 1,
    color: 'white',
  },
  navLinkText: {
    color: 'white',
  },
  navDropdown: {
    position: 'relative',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 40, // Adjust this value to control the dropdown position
    left: 0,
    backgroundColor: 'rgb(64, 149, 45)',
    padding: 10,
    borderRadius: 5,
    zIndex: 1,
  },
  dropdownItem: {
    paddingVertical: 5,
  },
  dropdownItemText: {
    color: 'white',
  },

  container: {
    marginTop: 100,
    marginBottom: 50,
    },
  
//   Footer
  footer: {
    backgroundColor: '#000',
    paddingVertical: 8,
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 16,
  },
  footerTextLight: {
    color: '#fff',
  },
  footerTextGreen: {
    color: '#00ff00', // Adjust the color to the desired green color
  },
  green: {
    color: 'rgb(64, 149, 45)',
    fontWeight: '500',
  },
  addTable: {
    height: 160,
  },
  addNew: {
    marginTop: 150,
    marginBottom: 20,
  },
  newMember: {
    padding: 10,
    marginBottom: 4,
    borderRadius: 7,
  },
  noAddNewMember: {
    border: '2px solid black',
    margin: '0 5px 8px 0',
    height: 45,
    width: 100,
    borderRadius: 8,
  },
  gray: {
    backgroundColor: 'gainsboro',
  },
  name: {
    border: '2px solid black',
    height: 50,
    margin: 10,
    width: '80%',
    borderRadius: 8,
  },
  domain: {
    border: '2px solid black',
    height: 50,
    margin: 10,
    width: '80%',
    borderRadius: 8,
  },
  year: {
    border: '2px solid black',
    height: 50,
    margin: 10,
    width: '80%',
    borderRadius: 8,
  },
  submit: {
    backgroundColor: 'rgb(64, 149, 45)',
    color: 'white',
    margin: 16,
    padding: 10,
    borderRadius: 7,
  },
  view: {
    borderRadius: 7,
  },
});

export default styles;
