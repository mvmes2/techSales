import { Replace } from "src/helpers/Replace";
import { randomUUID } from "crypto";
import { UserProps } from "../user/user";
import { Email } from "../user/validations/user.email.validation";
import { SessionProps } from "../session/session";
import { spTimeZoneDate } from "@helpers/dateSpTimezone";

export interface CompanyProps {
    company_name: string;
    cnpj: string;
    owner_name: string;
    owner_email: Email;
    product_key?: string;
    created_at: Date;
    updated_at?: Date | null;
    deleted_at?: Date | null;
    users?: UserProps[];
    sessions?: SessionProps[];
  }

export class Company {
    private _id: string;
    private props: CompanyProps;

    constructor(props: Replace<CompanyProps, { created_at?: Date }>, id?: string) {
        this._id = id ?? randomUUID();
        this.props = {
            ...props,
            created_at: props.created_at ?? spTimeZoneDate(new Date()),
        };
    }

    public get id(): string{
      return this._id;
    }

    public set cnpj(cnpj: string){
      this.props.cnpj = cnpj;
  }

  public get cnpj(): string{
    return this.props.cnpj;
  }

    public set company_name(company_name: string){
        this.props.company_name = company_name;
    }

    public get company_name(): string{
      return this.props.company_name;
    }

    public set owner_name(owner_name: string){
        this.props.owner_name = owner_name;
    }

    public get owner_name(): string{
      return this.props.owner_name;
    }

    public set owner_email(owner_email: Email){
        this.props.owner_email = owner_email;
    }
    
    public get owner_email(): Email{
      return this.props.owner_email;
    }

    public set product_key(product_key: string){
        this.props.product_key = product_key;
    }
    
    public get product_key(): string{
      return this.props.product_key;
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

    get users(): UserProps[] | null | undefined {
        return this.props.users;
      }

    get sessions(): SessionProps[] | null | undefined {
        return this.props.sessions;
      }

}