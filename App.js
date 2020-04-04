import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';
// import BleManager from './BleManager';
// const BleManagerModule = NativeModules.BleManager;
// const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
import {
  Device,
  Service,
  Characteristic,
  Descriptor,
  BleError,
  BleErrorCode,
  BleManager,
} from 'react-native-ble-plx';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.manager = new BleManager();
  }
  componentWillMount() {
    const subscription = this.manager.onStateChange(state => {
      if (state === 'PoweredOn') {
        this.scanAndConnect();
        subscription.remove();
      }
    }, true);
  }
  scanAndConnect() {
    let deviceNames = [];
    this.manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log('error: ', device);

        // Handle error (scanning will be stopped automatically)
        return;
      }
      // Check if it is a device you are looking for based on advertisement data
      // or other criteria.

      if (device.id) {
        // Creating an array of devices with names
        if (deviceNames.indexOf(device.id) === -1) {
          deviceNames.push(device.id);
          console.log('Found new device: ', device);
        }
      }
      this.setState({deviceNames});
    });
  }
  // async setupNotifications(device) {
  //   for (const id in this.sensors) {
  //     const service = this.serviceUUID(id);
  //     const characteristicW = this.writeUUID(id);
  //     const characteristicN = this.notifyUUID(id);

  //     const characteristic = await device.writeCharacteristicWithResponseForService(
  //       service,
  //       characteristicW,
  //       'AQ==' /* 0x01 in hex */,
  //     );

  //     device.monitorCharacteristicForService(
  //       service,
  //       characteristicN,
  //       (error, characteristic) => {
  //         if (error) {
  //           this.error(error.message);
  //           return;
  //         }
  //         this.updateValue(characteristic.uuid, characteristic.value);
  //       },
  //     );
  //   }
  // }
  // componentDidMount() {
  //   this._init();
  //   this.handlerDiscover = bleManagerEmitter.addListener(
  //     'BleManagerDiscoverPeripheral',
  //     this._handleDiscoverPeripheral,
  //   );
  //   this._startScan();
  // }
  // _init = () => {
  //   BleManager.start({showAlert: true}).then(() => {
  //     // Success code
  //     console.log('Module initialized');
  //   });
  // };
  // _startScan = () => {
  //   BleManager.scan([], 5, false).then(() => {
  //     // Success code
  //     console.log('Scan started');
  //   });
  //   BleManager.getDiscoveredPeripherals([]).then(peripheralsArray => {
  //     // Success code
  //     console.log('Discovered peripherals: ' + peripheralsArray.length);
  //   });
  // };
  // _handleDiscoverPeripheral = peripheral => {
  //   const {peripherals} = this.state;

  //   if (peripheral.name) {
  //     peripherals.set(peripheral.id, peripheral.name);
  //   }
  //   this.setState({peripherals});
  // };
  render() {
    console.log('State', this.state);
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {/* <Text>{this.state.info}</Text> */}
        {/* {Object.keys(this.sensors).map(key => {
          return (
            <Text key={key}>
              {this.sensors[key] +
                ': ' +
                (this.state.values[this.notifyUUID(key)] || '-')}
            </Text>
          );
        })} */}
      </View>
    );
  }
}
