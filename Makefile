CHROME_BIN := $(shell which chromium-browser)
COFFEE_BIN := $(shell which coffee)

ifeq ($(COFFE_BIN), "")
	@echo "Coffeescript required to build extension"
endif

ifeq ($(CHROME_BIN), "")
	CHROME_BIN := $(shell which chrome)
	ifeq ($(CHROME_BIN), "")
		@echo "Chrome or Chromium required to build extension"
	endif
endif

COFFEE_DIR 	 := src/coffee
JS_DIR		 := src/js
JS_SCRIPT	 := eschecker.js

TARGET_DIR	 := target
UNPACKED_DIR := $(TARGET_DIR)/unpacked
PACKED_DIR	 := $(TARGET_DIR)/packed

all: build

build: package

clean:
	@echo "Cleaning target..."
	@rm -rf $(TARGET_DIR)
	@rm $(JS_DIR)/$(JS_SCRIPT)

prepare: clean
	@echo "Preparing target..."
	@mkdir -p $(TARGET_DIR)
	@mkdir -p $(UNPACKED_DIR)
	@mkdir -p $(PACKED_DIR)

compile: prepare
	@echo "Compiling coffeescript..."
	@$(COFFEE_BIN) -jcp $(COFFEE_DIR)/*.coffee >> $(JS_DIR)/$(JS_SCRIPT)
	
copy: compile
	@echo "Copy files to $(UNPACKED_DIR)..."
	@cp -r src/* $(UNPACKED_DIR)
	@rm -r $(UNPACKED_DIR)/coffee

package: copy
	@echo "Packaging chrome extension..."
	@$(CHROME_BIN) --pack-extension=$(UNPACKED_DIR) --no-message-box >> $(TARGET_DIR)/log.txt 2>> $(TARGET_DIR)/log.txt
	@mv $(TARGET_DIR)/unpacked.crx $(PACKED_DIR)/eschecker.crx
	@mv $(TARGET_DIR)/unpacked.pem $(PACKED_DIR)/temp_cert.pem
		
test:
	@echo "test not yet implemented"


