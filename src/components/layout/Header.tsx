
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Menu, Search } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

type HeaderProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

const Header = ({
  sidebarOpen,
  setSidebarOpen
}: HeaderProps) => {
  const isMobile = useIsMobile();
  const { t } = useLanguage();
  
  return <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-background px-4 md:px-6">
      <div className="flex items-center space-x-4 w-full">
        {(!sidebarOpen || isMobile) && <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="shrink-0">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>}

        <div className="flex items-center mr-4">
          
          
        </div>

        <div className="hidden md:flex md:flex-1">
          <form className="flex-1 max-w-lg">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder={t("clients.search")} className="w-full bg-background pl-8 md:w-[300px] lg:w-[400px]" />
            </div>
          </form>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <LanguageSwitcher />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>{t("notifications")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-y-auto">
                <DropdownMenuItem className="cursor-pointer">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium leading-none">
                      New job assigned: Smith Residence
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Today at 10:30 AM
                    </p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium leading-none">
                      Client feedback received: Johnson Office
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Yesterday at 3:45 PM
                    </p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium leading-none">
                      Low supply warning: Floor cleaner
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Yesterday at 9:12 AM
                    </p>
                  </div>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>AK</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t("profile")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>{t("profile")}</DropdownMenuItem>
              <DropdownMenuItem>{t("profile.settings")}</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>{t("profile.logout")}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>;
};
export default Header;
