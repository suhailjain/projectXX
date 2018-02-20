<View style={styles.row}>
  <Icon name='home' iconStyle={{ marginLeft: 5, color: '#ffffff' }} />
  <Button
  backgroundColor='#003366'
    title='Home'
    onPress={() => {
    props.drawerState(true);
    Actions.lobby();
    }}
  />
</View>
<View
  style={{
    height: 1,
    backgroundColor: "#ffffff",
    marginRight: 10
  }}
/>
