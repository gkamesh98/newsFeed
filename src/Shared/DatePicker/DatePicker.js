import React, { useCallback, useState } from 'react'
import {
  Modal,
  View,
  StyleSheet,
  Text,
  Pressable,
  SafeAreaView,
} from 'react-native'
import TextInput from '../TextInput'

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']

const constructCalenderForMonthAndYear = ({ month, year } = {}) => {
  const date = new Date()

  const calArr = new Array(7).fill([null])

  if (month) {
    date.setMonth(month)
  }
  if (year) {
    date.setFullYear(year)
  }

  const lastDateOfMonth = (() => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  })()

  for (let i = 1; i <= lastDateOfMonth; i = i + 1) {
    date.setDate(i)
    const day = date.getDay()
    if (day && calArr[day - 1].length === 1 && calArr[day][0] === null) {
      calArr[day] = [i]
    } else {
      calArr[day] = [...calArr[day], i]
    }
  }

  return calArr
}

const DatePicker = ({ ...props }) => {
  const [displayDatePickerModal, setDisplayDatePickerModal] = useState(false)

  const [dayCalender, setDateCalender] = useState(
    constructCalenderForMonthAndYear(),
  )

  const setMonthAndYear = useCallback(monthAndYearObject => {
    setDateCalender(constructCalenderForMonthAndYear(monthAndYearObject))
  }, [])

  return (
    <SafeAreaView>
      <Pressable
        onPress={() => {
          setDisplayDatePickerModal(true)
        }}>
        <TextInput editable={false} />
      </Pressable>

      <Modal
        animationType="fade"
        transparent={true}
        visible={displayDatePickerModal}
        onRequestClose={() => {
          setDisplayDatePickerModal(!displayDatePickerModal)
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Select Date</Text>
            {/* date selector */}
            <View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-evenly',
                }}>
                {days.map((value, index) => {
                  return (
                    <View
                      key={index}
                      style={{ display: 'flex', flexDirection: 'column' }}>
                      <Text>{value}</Text>
                      {dayCalender[index]?.map((day, dayIndex) => {
                        return <Text key={`${index}-${dayIndex}`}>{day}</Text>
                      })}
                    </View>
                  )
                })}
              </View>
            </View>
            {/* actions */}
            <View style={styles.actionsStyles}>
              <Pressable
                onPress={() =>
                  setDisplayDatePickerModal(!displayDatePickerModal)
                }>
                <Text
                  style={{
                    color: '#2196F3',
                  }}>
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.submitButton]}
                onPress={() => {
                  setDisplayDatePickerModal(!displayDatePickerModal)
                }}>
                <Text style={styles.textStyle}>Confirm</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalView: {
    width: '90%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 8,
    elevation: 2,
  },

  submitButton: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  actionsStyles: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    paddingTop: 8,
  },
})

export default DatePicker
