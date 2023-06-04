import React from 'react';

const HeaderComponent = (props) => {
  return (
    <Header
      barStyle='default'
      centerComponent={{
        text: `${props.content}`,
        style: { color: '#fff' },
      }}
      containerStyle={{ height: 80 }}
      leftComponent={
        <TouchableOpacity
          style={{ marginLeft: 5 }}
          // onPress={handleHomeIconPress}
        >
          <Icon name='menu' color='#fff' />
        </TouchableOpacity>
      }
      placement='center'
      rightComponent={
        <TouchableOpacity
          style={{ marginRight: 5 }}
          onPress={handleHomeIconPress}
        >
          <Icon name='home' color='#fff' />
        </TouchableOpacity>
      }
    />
  );
};

export default HeaderComponent;
