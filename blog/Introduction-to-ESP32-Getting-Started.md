---
title: "Introduction to ESP32: Getting Started"
date: 2026-03-19
image: blog2.png
url: https://esp32s-nodemcu-controls.notion.site/Introduction-to-ESP32-Getting-Started-328e601b019a8084a161f8acbfe68610?pvs=74
---

This blog is a redirect. Read the full article here:

[Introduction to ESP32 - Getting Started](https://esp32s-nodemcu-controls.notion.site/Introduction-to-ESP32-Getting-Started-328e601b019a8084a161f8acbfe68610?pvs=74)
- If OLED shows nothing, try swapping SDA and SCL wires.

## ESP32 DevKit Pin & Component Guide

### Main Module: ESP32-WROOM-32
- Dual-core Xtensa LX6 CPU @ 240MHz
- Wi-Fi (802.11 b/g/n, 2.4GHz)
- Bluetooth 4.2 + BLE
- 520KB SRAM, 4MB Flash
- Built-in PCB antenna

### Other Components
| Component      | Role                                      |
|---------------|-------------------------------------------|
| SiLabs CP2102 | USB-to-UART bridge (flashing code)         |
| AMS1117       | 3.3V voltage regulator                     |
| EN button     | Reset (does not erase code)                |
| BOOT button   | Flash mode trigger                         |
| USB-C port    | Power + data                               |
| Red LED       | Power indicator                            |

### Pin Overview
- **Left side:** Analog-heavy, input-only pins, DAC outputs
- **Right side:** Digital communication (I2C, SPI, UART)
- **Bottom:** EN (reset), USB-C (power/flash), BOOT (flash mode)
- **Top:** ESP32-WROOM-32 module

### Power Pins
| Pin  | Voltage | Use                          |
|------|---------|------------------------------|
| VIN  | 5V      | External power input         |
| 3V3  | 3.3V    | Power output for sensors     |
| GND  | 0V      | Common ground                |

### Boot-Sensitive Pins
| Pin  | Boot Behavior                         |
|------|----------------------------------------|
| D2   | Must be LOW or floating at boot        |
| D5   | Must be HIGH at boot                   |
| D12  | Must be LOW at boot (flash voltage)    |
| D14  | Can cause issues if driven at boot     |
| D15  | Must be HIGH at boot                   |

### Communication Protocols
| Protocol | Pins                               |
|----------|------------------------------------|
| I2C      | SDA = D21, SCL = D22               |
| SPI (VSPI)| MOSI = D23, MISO = D19, CLK = D18, CS = D5 |
| SPI (HSPI)| MOSI = D13, MISO = D12, CLK = D14, CS = D15 |
| UART0    | TX = TXO, RX = RX0                 |
| UART2    | TX = TX2, RX = RX2                 |

## Quick Mental Model
- ESP32 is versatile, affordable, and ideal for wireless projects.
- Left side: analog, right side: digital comms, bottom: power/reset, top: main module.

## Code & Resources
- All code examples: [GitHub Repository](https://github.com/omn7/ESP32S-NodeMCU-controls)

## Reference
- Original blog: [Introduction to ESP32 - Getting Started](https://esp32s-nodemcu-controls.notion.site/Introduction-to-ESP32-Getting-Started-328e601b019a8084a161f8acbfe68610?pvs=74)

---

![ESP32 Pinout](blog2.png)

