import { isAndroid, isIOS, Utils } from "@nativescript/core"

export class Heading {
  private sensorUpdate: any
  private sensorManager: any

  startHeadingUpdates() {
    if (this.sensorManager || this.sensorUpdate) {
      return
    }

    if (isIOS) {
      this.sensorManager = CLLocationManager.alloc().init()
      if (this.sensorManager.headingAvailable) {
        this.sensorManager.startUpdatingHeading()
        this.sensorUpdate = setInterval(() => {
          console.log(this.sensorManager.heading.trueHeading)
        }, 100)
      } else {
        console.log("Heading not available")
      }
      return
    }

    if (isAndroid) {
      this.sensorManager = Utils.android.getApplicationContext().getSystemService(android.content.Context.SENSOR_SERVICE)
      this.sensorUpdate = new android.hardware.SensorEventListener({
        onAccuracyChanged: () => {},
        onSensorChanged: (event) => {
          console.log(-event.values[0])
        }
      })

      const orientationSensor = this.sensorManager.getDefaultSensor(android.hardware.Sensor.TYPE_ORIENTATION)
      this.sensorManager.registerListener(
        this.sensorUpdate,
        orientationSensor,
        android.hardware.SensorManager.SENSOR_DELAY_UI
      )

    }

  }
}