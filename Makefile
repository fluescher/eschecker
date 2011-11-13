CHROME_BIN := $(shell which chromium-browser)
COFFEE_BIN := $(shell which coffee)


COFFEE_DIR 	 := src/coffee
COFFEE_FILES := $(COFFEE_DIR)/Model.coffee $(COFFEE_DIR)/Searcher.coffee $(COFFEE_DIR)/Configuration.coffee $(COFFEE_DIR)/Parser.coffee 
JS_DIR		 := src/js
JS_SCRIPT	 := eschecker.js

TARGET_DIR	 := target
UNPACKED_DIR := $(TARGET_DIR)/unpacked
PACKED_DIR	 := $(TARGET_DIR)/packed
EXT_FILE	 := $(PACKED_DIR)/eschecker.crx

all: build

build: package

check:
	@echo "Checking environment..."

clean: check
	@echo "Cleaning target..."
	@rm -rf $(TARGET_DIR)
	@rm -f $(JS_DIR)/$(JS_SCRIPT)

prepare: clean
	@echo "Preparing target..."
	@mkdir -p $(TARGET_DIR)
	@mkdir -p $(UNPACKED_DIR)
	@mkdir -p $(PACKED_DIR)

compile: prepare
	@echo "Compiling coffeescript..."
	@$(COFFEE_BIN) --join $(JS_DIR)/$(JS_SCRIPT) --compile $(COFFEE_FILES) 
	
copy: compile
	@echo "Copy files to $(UNPACKED_DIR)..."
	@cp -r src/* $(UNPACKED_DIR)
	@rm -r $(UNPACKED_DIR)/coffee

package: copy
	@echo "Packaging chrome extension to $(EXT_FILE)..."
	@$(CHROME_BIN) --pack-extension=$(UNPACKED_DIR) --no-message-box >> $(TARGET_DIR)/log.txt 2>> $(TARGET_DIR)/log.txt
	@mv $(TARGET_DIR)/unpacked.crx $(EXT_FILE)
	@mv $(TARGET_DIR)/unpacked.pem $(PACKED_DIR)/temp_cert.pem
		
test:
	@echo "test not yet implemented"


