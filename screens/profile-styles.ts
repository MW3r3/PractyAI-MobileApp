import { StyleSheet } from 'react-native';

const ProfileStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: theme.background,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    width: '96%',
    height: 50,
  },
  rightSide: {
    alignItems: 'flex-end',
    width: '48%',
    paddingHorizontal: 16,
  },
  leftSide: {
    alignItems: 'flex-start',
    width: '48%',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    marginHorizontal: 16,
    width: '96%',
    height: '80%',
    backgroundColor: theme.background,
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 16,
    borderWidth: 1,
    borderColor: theme.secondary,
    borderTopLeftRadius:78,
    borderBottomLeftRadius:78,
    borderTopRightRadius:20,
    borderBottomRightRadius:20,
    backgroundColor: "#212124",
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: theme.text,
  },
  profileName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: theme.text,
    textAlign: 'center',
    marginHorizontal: 16,
    width: 'auto',
  },
  userInfo: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 32,
    width: 'auto',
    height: 'auto',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.secondary,
    backgroundColor: "#212124",
    paddingHorizontal: 10,
    paddingVertical: 24,
  },
    logoutButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        padding: 10,
        backgroundColor: theme.alert,
    },
    logoutButtonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: theme.text,
        textAlign: 'center',
        marginVertical: 0,
    },
    inputContainer: {
       flexDirection: 'column',
       justifyContent: 'flex-start',
       alignItems: 'flex-start',
       width: '100%',
       marginVertical: 8,
    },
    inputTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: theme.text,
        textAlign: 'left',
        marginVertical: 4,
        marginHorizontal: 4,
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: theme.secondary,
        backgroundColor: "#212124",
        paddingHorizontal: 10,
        
        color: theme.text,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', 
        width: 'auto',
        height: 'auto',
        backgroundColor: "#212124",
        marginVertical: 10,
    },
    actionButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginHorizontal: 10,
        backgroundColor: theme.secondary,
        width: 'auto',
    },
    actionButtonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: theme.text,
        textAlign: 'center',
        marginVertical: 0,
    },
});

export default ProfileStyles;