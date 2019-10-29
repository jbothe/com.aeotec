'use strict';

// 
// Aeon Labs Micro Smart Dimmer G2
// Product Manual: https://www.cd-jackson.com/zwave_device_uploads/79/z-wave-aeon-labs-micro-smart-energy-illuminator-engineering-specification-1-.pdf
// 

const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class DSC19103 extends ZwaveDevice {
	onMeshInit() {
        this.registerCapability('onoff', 'SWITCH_MULTILEVEL');
        this.registerCapability('dim', 'SWITCH_MULTILEVEL');

        this.registerCapability('measure_power', 'METER');
        this.registerCapability('meter_power', 'METER');

        // Set capability values when the device is manually changed via the switch
        this.registerReportListener('BASIC', 'BASIC_REPORT', (report) => {
          this.setCapabilityValue('onoff', !!report.Value);
          if (report.Value > 0) {
            this.setCapabilityValue('dim', report.Value / 100);
          }
        });

        this.registerSetting('80', value => new Buffer([(value) ? 2 : 0]));
    }
}

module.exports = DSC19103;
