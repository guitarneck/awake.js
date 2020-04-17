# List the rules inside a Makefile
#
# Inlude in makefile like this to prevent default running:
#
# ifeq ($(MAKECMDGOALS),list)
# -include mk/list.mk
# endif

list_main_makefile := $(firstword $(MAKEFILE_LIST))

list:
	@$(info Rules in $(list_main_makefile) :)
	@$(MAKE) -pnRr -f $(list_main_makefile) 2>/dev/null \
	| awk '{if(/^#.*target:/){getline;next}if(/^[^#].*:/){r=$$1}if(/^#.*not exist/&&r){sub(/[:]$$/,"",r);print " -",r;r=0}}' \
	| sort