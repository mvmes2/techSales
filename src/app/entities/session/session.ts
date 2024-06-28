import { Replace } from "src/helpers/Replace";
import { randomUUID } from "crypto";
import { UserProps } from "../user/user";
import { CompanyProps } from "../company/company";
import { spTimeZoneDate } from "@helpers/dateSpTimezone";

export interface SessionProps {
    company_id: string;
    company?: CompanyProps;
    user_id: string;
    user?: UserProps;
    token: string;
    ip_address: string;
    location: string;
    browser: string;
    created_at: Date;
    updated_at?: Date | null;
    deleted_at?: Date | null;
  }

export class Session {
    private _id: string;
    private props: SessionProps;
    
    constructor(props: Replace<SessionProps, { created_at?: Date }>, id?: string) {
        this._id = id ?? randomUUID();
        this.props = {
            ...props,
            created_at: props.created_at ?? spTimeZoneDate(new Date()),
        };
    }

    public get id(): string{
      return this._id;
    }

    public set company_id(company_id: string){
        this.props.company_id = company_id;
    }
    
    public get company_id(): string{
      return this.props.company_id;
    }

    get company(): CompanyProps | null | undefined {
        return this.props.company;
      }

    public set user_id(user_id: string){
        this.props.user_id = user_id;
    }
    
    public get user_id(): string{
      return this.props.user_id;
    }

    get user(): UserProps | null | undefined {
        return this.props.user;
      }

    public set token(token: string){
        this.props.token = token;
    }
    
    public get token(): string{
      return this.props.token;
    }

    public set ip_address(ip_address: string){
        this.props.ip_address = ip_address;
    }
    
    public get ip_address(): string{
      return this.props.ip_address;
    }

    public set location(location: string){
        this.props.location = location;
    }
    
    public get location(): string{
      return this.props.location;
    }

    public set browser(browser: string){
        this.props.browser = browser;
    }
    
    public get browser(): string{
      return this.props.browser;
    }

    public get created_at(): Date{
        return this.props.created_at;
      }

    public set updated_at(updated_at: Date){
        this.props.updated_at = updated_at;
    }
    
    public get updated_at(): Date | null | undefined{
      return this.props.updated_at;
    }

    public get deleted_at(): Date | null | undefined{
      return this.props.deleted_at;
    }

    public set deleted_at(date: Date){
       this.props.deleted_at = date;
    }

}