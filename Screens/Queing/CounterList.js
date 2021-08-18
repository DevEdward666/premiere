import React from 'react'

const CounterList = ()=> {
    const counterlist = useSelector(state => state.QueueReducers.counterlist)
    return (
        <ImageBackground
        style={{flex: 1}}
        source={require('../../assets/background/white.jpg')}
        resizeMode="cover"
        blurRadius={20}>
          <View style={styles.container}>
        <ScrollView >
            <View>
           
                {counterlist?.map((item,index)=>{
                    return(
                        <View style={{flexDirection: 'column'}} key={index}>
                        <TouchableHighlight
                          onPress={() => dispatch(generatenumberregular(item?.countername,users_reducers?.prem_id))}
                          underlayColor="white">
                          <Card containerStyle={styles.plate}>
                            <View
                              style={{
                                flexDirection: 'row',
                                height: 30,
                                alignItems: 'center',
                              }}>
                              <View
                                style={{
                                  width: '100%',
                                  height: 20,
                                  justifyContent: 'center',
                                }}>
                                <Text
                                  style={{
                                    textAlign: 'center',
                                    marginStart: 10,
                                    fontSize: 14,
                                    alignContent: 'center',
                                  }}>
                                  {item?.queueno}
                                </Text>
                              </View>
                        
                            </View>
                          </Card>
                        </TouchableHighlight>
                      </View>
                    )
    
    
                })}
           
            </View>
        </ScrollView>
        </View>
        </ImageBackground>
    )
}

export default CounterList