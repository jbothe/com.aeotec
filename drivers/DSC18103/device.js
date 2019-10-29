'use strict';

// 
// Aeon Labs Micro Switch G2
// Product Manual: https://www.cd-jackson.com/zwave_device_uploads/82/10-Micro-Switch-G2.pdf
// 

const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class DSC18103 extends ZwaveDevice {
	onMeshInit() {
        this.registerCapability('onoff', 'SWITCH_BINARY');

        this.registerCapability('measure_power', 'METER');
        this.registerCapability('meter_power', 'METER');

        // Set capability values when the device is manually changed via the switch
        this.registerReportListener('BASIC', 'BASIC_REPORT', (report) => {
          this.setCapabilityValue('onoff', !!report.Value);
        });

        this.registerSetting('80', value => new Buffer([(value) ? 2 : 0]));

        this.enableDebug();
    }
}

module.exports = DSC18103;
