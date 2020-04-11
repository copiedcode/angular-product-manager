import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'convertToSpaces'
})

export class ConvertToSpacesPipe implements PipeTransform {

transform(inputString:string, character: string): string {
    return inputString.replace(character, ' ');
}

}