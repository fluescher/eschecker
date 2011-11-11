CHROME_BIN=chromium-browser

COFFEE_DIR=src/coffee
JS_DIR=src/js

TARGET_DIR=target
UNPACKED_DIR=$(TARGET_DIR)/unpacked
PACKED_DIR=$(TARGET_DIR)/packed

all: build

build: package

clean:
	rm -rf $(TARGET_DIR)

prepare: clean
	mkdir -p $(TARGET_DIR)
	mkdir -p $(UNPACKED_DIR)
	mkdir -p $(PACKED_DIR)

compile: prepare
	coffee -jcp $(COFFEE_DIR)/*.coffee > $(JS_DIR)/checker.js
	@echo "compile"
	
copy: compile
	cp -r src/* $(UNPACKED_DIR)
	rm -r $(UNPACKED_DIR)/coffee

package: copy
	$(CHROME_BIN) --pack-extension=$(UNPACKED_DIR) --no-message-box
	mv $(TARGET_DIR)/unpacked.crx $(PACKED_DIR)/eschecker.crx
	mv $(TARGET_DIR)/unpacked.pem $(PACKED_DIR)/temp_cert.pem
		

test:
	@echo "test not yet implemented"


